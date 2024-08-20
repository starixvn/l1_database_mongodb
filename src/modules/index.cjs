const { getCollationSimpleName } = require("./collate.cjs");
const { log } = require("./utils.cjs");

/**
 * @param { Database } db
 * @param { string } collection
 */
const getIndexList = async (db, collection) => {
    /** @type { Map<string, string> } */
    const mapping = new Map();

    const indexes = await db.getCollection(collection).getIndexes();
    for (const { key, name } of indexes) {
        const keyString = JSON.stringify(key);
        mapping.set(name, keyString);
        mapping.set(keyString, name);
    }

    return mapping;
};

/** @param { IndexDefinition["key"] } indexKeys */
const buildIndexKeyName = (indexKeys) => {
    const names = [];
    for (const [field, direction] of Object.entries(indexKeys)) {
        if (direction === 1) {
            names.push(field);
        } else {
            names.push(`${field}$${direction}`);
        }
    }
    return names.join("_");
};

/**
 * @param { string } collection
 * @param { IndexDefinition } indexDefinition
 */
const buildIndexName = (collection, indexDefinition) => {
    const { key, options } = indexDefinition;
    const { unique, sparse, partialFilterExpression, expireAfterSeconds, collation } = options;
    const keyName = buildIndexKeyName(key);
    const collateName = getCollationSimpleName(collation);

    let name = "IX";

    if (unique) {
        name = `U${name}`;
    }
    if (sparse) {
        name = `S${name}`;
    }
    if (partialFilterExpression) {
        name = `F${name}`;
    }
    if (expireAfterSeconds != null) {
        name = `TTL_${name}`;
    }
    return [name, collection, keyName, collateName].filter(Boolean).join("_");
};

/**
 * @param { Database } db
 * @param { string } collection
 * @param { IndexDefinition } indexDefinition
 */
const deployIndex = async (db, collection, indexDefinition) => {
    const { key, options } = indexDefinition;
    const name = buildIndexName(collection, indexDefinition);
    const indexName = await db.getCollection(collection).createIndex(key, { ...options, name });
    return indexName;
};

/**
 * @param { Database } db
 * @param { string } collection
 * @param { string } indexName
 */
const dropIndex = async (db, collection, indexName) => {
    const namespace = `${db.getName()}.${collection}`;
    await db.getCollection(collection).dropIndex(indexName);
    log("W", "INDEX", `[${namespace}]`, `Index ${indexName} dropped.`);
};

/**
 * @param { Database } db
 * @param { string } collection
 * @param { IndexDefinition[] } indexDefinitions
 */
const deployIndexes = async (db, collection, indexDefinitions) => {
    const namespace = `${db.getName()}.${collection}`;

    const indexList = await getIndexList(db, collection);

    for (const indexDefinition of indexDefinitions) {
        try {
            const indexName = await deployIndex(db, collection, indexDefinition);
            const hasKey = indexList.delete(indexList.get(indexName) ?? "");
            const hasName = indexList.delete(indexName);
            if (!hasKey || !hasName) {
                log("I", "INDEX", `[${namespace}]`, `Index ${indexName} created.`);
            }
        } catch (e) {
            if (!(e instanceof Error) || e.constructor.name !== "MongoServerError") {
                log("E", "INDEX", `[${namespace}]`, e);
                continue;
            }

            const err = /** @type { MongoServerError } */ (e);
            if (err.codeName === "IndexKeySpecsConflict") {
                log("W", "INDEX", `[${namespace}]`, "IndexKeySpecsConflict");
                const name = buildIndexName(collection, indexDefinition);
                await dropIndex(db, collection, name);
                const indexName = await deployIndex(db, collection, indexDefinition);
                log("I", "INDEX", `[${namespace}]`, `Index ${indexName} created.`);
                indexList.delete(indexList.get(name) ?? "");
                indexList.delete(name);
                continue;
            }
            if (err.codeName === "IndexOptionsConflict") {
                log("W", "INDEX", `[${namespace}]`, "IndexOptionsConflict");
                const name = indexList.get(JSON.stringify(indexDefinition.key));
                if (name) {
                    await dropIndex(db, collection, name);
                    const indexName = await deployIndex(db, collection, indexDefinition);
                    log("I", "INDEX", `[${namespace}]`, `Index ${indexName} created.`);
                    indexList.delete(indexList.get(name) ?? "");
                    indexList.delete(name);
                }
                continue;
            }
            log("E", "INDEX", `[${namespace}]`, e);
        }
    }
    {
        const name = "_id_";
        indexList.delete(indexList.get(name) ?? "");
        indexList.delete(name);
    }
    for (const key of indexList.keys()) {
        const regex = /^\{.*\}$/;
        if (regex.test(key)) {
            continue;
        }
        await dropIndex(db, collection, key);
    }
};

module.exports = { deployIndexes };
