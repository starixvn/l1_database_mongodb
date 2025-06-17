// @ts-check

(async () => {
    const { getIdentity, validateColl } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { category_type_U, gameConfigs_id_U, name_id_U, ns_U } = require("../../modules/indexes/ops.cjs");

    /** @param { BsonDocument } dataSchema */
    const validator = (dataSchema) => ({
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "category", "type", "dbs", "data", "targets", "__v"],
            additionalProperties: false,
            properties: {
                _id: {
                    bsonType: "object",
                    required: ["category", "type"],
                    additionalProperties: false,
                    properties: {
                        category: { enum: ["games"] },
                        type: { bsonType: "number" },
                    },
                },
                category: { enum: ["games"] },
                type: { bsonType: "number" },
                dbs: {
                    bsonType: "array",
                    minItems: 0,
                    items: { bsonType: "string", minLength: 1 },
                },
                data: {
                    bsonType: "array",
                    minItems: 0,
                    items: dataSchema,
                },
                targets: {
                    bsonType: "array",
                    minItems: 0,
                    items: {
                        bsonType: "object",
                        required: ["db", "coll"],
                        additionalProperties: false,
                        properties: {
                            db: { bsonType: "string", minLength: 1 },
                            coll: { bsonType: "string", minLength: 1 },
                        },
                    },
                },
                __v: { bsonType: "number", minimum: 0 },
                __trigger: { bsonType: "bool" },
            },
        },
    });

    const opsDB = db.getSiblingDB("ops_configs");

    await deployIndexes(opsDB, "index_templates", [category_type_U]);
    await opsDB.runCommand({ collMod: "index_templates", changeStreamPreAndPostImages: { enabled: true } });
    await validateColl(opsDB, "index_templates", {
        validator: validator({
            bsonType: "object",
            required: ["postfix", "idxs"],
            additionalProperties: false,
            properties: {
                postfix: { bsonType: "string", minLength: 0 },
                idxs: {
                    bsonType: "object",
                    minProperties: 0,
                    patternProperties: {
                        "^.*$": { bsonType: "string" },
                    },
                },
            },
        }),
        validationLevel: "strict",
        validationAction: "error",
    });

    await deployIndexes(opsDB, "summary_templates", [category_type_U]);
    await opsDB.runCommand({ collMod: "summary_templates", changeStreamPreAndPostImages: { enabled: true } });
    await validateColl(opsDB, "summary_templates", {
        validator: validator({ bsonType: "object" }),
        validationLevel: "strict",
        validationAction: "error",
    });

    await deployIndexes(opsDB, "archive_templates", [category_type_U]);
    await opsDB.runCommand({ collMod: "archive_templates", changeStreamPreAndPostImages: { enabled: true } });
    await validateColl(opsDB, "archive_templates", {
        validator: validator({ bsonType: "object" }),
        validationLevel: "strict",
        validationAction: "error",
    });

    await deployIndexes(opsDB, "summary_configs", [gameConfigs_id_U, name_id_U]);
    await deployIndexes(opsDB, "hotdog_summary_configs", [gameConfigs_id_U, name_id_U]);
    await deployIndexes(opsDB, "archive_configs", [gameConfigs_id_U, name_id_U]);

    await deployIndexes(opsDB, "change_stream_configs", [ns_U]);
    await validateColl(opsDB, "change_stream_configs", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                title: "Change Stream Configs Validation",
                required: ["_id", "ns", "event"],
                additionalProperties: false,
                properties: {
                    _id: {
                        bsonType: "object",
                        required: ["db", "coll"],
                        additionalProperties: false,
                        properties: {
                            db: { bsonType: "string", minLength: 1 },
                            coll: { bsonType: "string", minLength: 1 },
                        },
                    },
                    ns: {
                        bsonType: "object",
                        required: ["db", "coll"],
                        additionalProperties: false,
                        properties: {
                            db: { bsonType: "string", minLength: 1 },
                            coll: { bsonType: "string", minLength: 1 },
                        },
                    },
                    event: { bsonType: "string", minLength: 1 },
                },
            },
        },
        validationLevel: "strict",
        validationAction: "error",
    });
})();
