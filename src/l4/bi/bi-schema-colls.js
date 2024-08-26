(async () => {
    const { getIdentity, ensureCollection, ensureView, validateColl } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const ns = {
        schemaTables: "schema_tables",
        schemas: "schemas",
        names: "names",
    };

    const biDB = db.getSiblingDB("bi");

    await ensureCollection(biDB, ns.schemaTables, {
        clusteredIndex: {
            key: { _id: 1 },
            unique: true,
        },
    });

    await validateColl(biDB, ns.schemaTables, {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                title: "MongoDB BI Schema Validation",
                required: ["_id", "columns"],
                additionalProperties: false,
                properties: {
                    _id: {
                        bsonType: "object",
                        required: ["schema", "db", "table"],
                        additionalProperties: false,
                        properties: {
                            schema: {},
                            db: { bsonType: "string", minLength: 1 },
                            table: { bsonType: "string", minLength: 1 },
                        },
                    },
                    source: { bsonType: "string", minLength: 1 },
                    pipeline: { bsonType: "string" },
                    columns: {
                        bsonType: "array",
                        minItems: 1,
                        uniqueItems: true,
                        additionalProperties: false,
                        items: {
                            bsonType: "object",
                            required: ["mongo_name", "sql_name", "mongo_type", "sql_type"],
                            additionalProperties: false,
                            properties: {
                                mongo_name: { bsonType: "string", minLength: 1 },
                                sql_name: { bsonType: "string", minLength: 1 },
                                mongo_type: { enum: ["bson.ObjectId", "string", "float64", "int", "int64", "bool", "date", "mongo.Filter", "bson.Object", "bson.Array"] },
                                sql_type: { enum: ["objectid", "varchar", "float", "int", "boolean", "timestamp"] },
                            },
                        },
                    },
                },
            },
        },
        validationLevel: "strict",
        validationAction: "error",
    });

    await ensureView(biDB, ns.schemas, {
        viewOn: ns.schemaTables,
        pipeline: [
            {
                $group: {
                    _id: { schema: "$_id.schema", db: "$_id.db" },
                    tables: {
                        $addToSet: {
                            mongo_name: { $ifNull: ["$source", "$_id.table"] },
                            sql_name: "$_id.table",
                            pipeline: { $ifNull: ["$pipeline", "[]"] },
                            columns: "$columns",
                        },
                    },
                },
            },
            {
                $group: {
                    _id: "$_id.schema",
                    databases: {
                        $addToSet: {
                            name: "$_id.db",
                            tables: "$tables",
                        },
                    },
                },
            },
            {
                $set: {
                    schema: { databases: "$databases" },
                    databases: "$$REMOVE",
                    version: "3.0.0",
                },
            },
        ],
    });

    await ensureCollection(biDB, ns.names);
})();
