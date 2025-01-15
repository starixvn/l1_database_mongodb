// @ts-check

(async () => {
    const { getIdentity, validateColl } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { category_type_U, gameConfigs_id_U, name_id_U, ns_U } = require("../../modules/indexes/ops.cjs");

    const opsDB = db.getSiblingDB("ops_configs");

    await deployIndexes(opsDB, "index_templates", [category_type_U]);
    await deployIndexes(opsDB, "summary_templates", [category_type_U]);
    await deployIndexes(opsDB, "archive_templates", [category_type_U]);

    await deployIndexes(opsDB, "summary_configs", [gameConfigs_id_U, name_id_U]);
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
