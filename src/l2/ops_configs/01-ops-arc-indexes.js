(async () => {
    const { getIdentity, ensureCollection, validateColl } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["archive", "mixed"].includes(stage)) return;

    const opsDB = db.getSiblingDB("ops_configs");

    await ensureCollection(opsDB, "md5_configs", {
        clusteredIndex: {
            key: { _id: 1 },
            unique: true,
        },
    });

    await validateColl(opsDB, "md5_configs", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                title: "MD5 Configs Validation",
                required: ["_id", "fields"],
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
                    fields: {
                        bsonType: "array",
                        minItems: 1,
                        uniqueItems: true,
                        additionalProperties: false,
                        items: { bsonType: "string", minLength: 1 },
                    },
                },
            },
        },
        validationLevel: "strict",
        validationAction: "error",
    });
})();
