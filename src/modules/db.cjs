const { fail } = require("assert");
const { getCollate } = require("./collate.cjs");
const { log, compare } = require("./utils.cjs");

/** @param { Database } db */
const getIdentity = async (db) =>
    /** @type { Identity | null } */ (await db.getSiblingDB("admin").getCollection("identity").findOne()) ?? fail("Database instance does not have identity.");

/**
 * @param { Database } db
 * @param { string } name
 * @param { CreateCollectionOptions } options
 */
const ensureCollection = async (db, name, options = {}) => {
    const namespace = `${db.getName()}.${name}`;
    let exists = await db.getCollection(name).exists();

    if (!exists) {
        log("W", "COLL", `[${namespace}] does not exist. Creating...`);
        const { ok } = await db.createCollection(name, options);
        log("I", "COLL", `[${namespace}] collection created.`, { ok });
        exists = await db.getCollection(name).exists();
    }

    compare(
        { collation: getCollate(exists.options.collation) }, //
        { collation: getCollate(options.collation) },
        `COLL  [${namespace}]`,
    );
    compare(
        { capped: exists.options.capped, size: exists.options.size, max: exists.options.max }, //
        { capped: options.capped, size: options.size, max: options.max },
        `COLL  [${namespace}]`,
    );
    compare(
        { timeseries: exists.options.timeseries }, //
        { timeseries: options.timeseries },
        `COLL  [${namespace}]`,
    );
    {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { v, name, ...clusteredIndex } = exists.options.clusteredIndex ?? {};
        compare(
            { clusteredIndex }, //
            { clusteredIndex: options.clusteredIndex ?? {} },
            `COLL  [${namespace}]`,
        );
    }
};

/**
 * @param { Database } db
 * @param { string } name
 * @param { Pick<CreateCollectionOptions, "viewOn" | "pipeline" | "collation"> } options
 */
const ensureView = async (db, name, options) => {
    const namespace = `${db.getName()}.${name}`;

    if (!options.viewOn) {
        log("E", "VIEW", `[${db.getName()}.${name}]`, new Error("Invalid create view options."));
        return;
    }

    let exists = await db.getCollection(name).exists();
    if (!exists) {
        log("W", "VIEW", `[${namespace}] does not exist. Creating...`);
        const { ok } = await db.createCollection(name, options);
        log("I", "VIEW", `[${namespace}] view created.`, { ok });
        exists = await db.getCollection(name).exists();
    }

    if (
        compare(
            { viewOn: exists.options.viewOn, pipeline: exists.options.pipeline }, //
            { viewOn: options.viewOn, pipeline: options.pipeline },
        )
    ) {
        return;
    }

    const { ok } = await db.runCommand({ collMod: name, ...options });
    log("I", "VIEW", `[${namespace}] set definition`, { ok });
    exists = await db.getCollection(name).exists();

    compare(
        { viewOn: exists.options.viewOn, pipeline: exists.options.pipeline }, //
        { viewOn: options.viewOn, pipeline: options.pipeline },
        `VIEW  [${namespace}]`,
    );
};

/**
 * @param { Database } db
 * @param { string } name
 * @param { Pick<CreateCollectionOptions, "validator" | "validationLevel" | "validationAction"> } options
 */
const validateColl = async (db, name, options) => {
    const namespace = `${db.getName()}.${name}`;
    const { validator, validationLevel, validationAction } = options;

    let exists = await db.getCollection(name).exists();
    if (!exists) {
        log("E", "COLL", `[${db.getName()}.${name}]`, new Error("Collection does not exist."));
        return;
    }

    if (
        compare(
            { validator: exists.options.validator, validationLevel: exists.options.validationLevel, validationAction: exists.options.validationAction }, //
            { validator: options.validator, validationLevel: options.validationLevel, validationAction: options.validationAction },
        )
    ) {
        return;
    }

    const { ok } = await db.runCommand({ collMod: name, validator, validationLevel, validationAction });
    log("I", "COLL", `[${db.getName()}.${name}] set validation.`, { ok });
    exists = await db.getCollection(name).exists();

    compare(
        { validator: exists.options.validator, validationLevel: exists.options.validationLevel, validationAction: exists.options.validationAction }, //
        { validator: options.validator, validationLevel: options.validationLevel, validationAction: options.validationAction },
        `COLL  [${namespace}]`,
    );
};

module.exports = { getIdentity, ensureCollection, ensureView, validateColl };
