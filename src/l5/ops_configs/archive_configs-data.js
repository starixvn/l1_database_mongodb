(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { archiveConfigs } = require("../../modules/ops_configs/archive_configs.cjs");

    /** @type { BsonDocument[] } */
    const archiveGameConfigs = [];
    // const commonConfig = { category: "games", type: 0 };

    /** @type { AnyBulkWriteOperation[] } */
    const bulkWrite = [...archiveConfigs, ...archiveGameConfigs].map((doc) => {
        const { gameConfigs, id } = doc;
        const data = Object.assign({}, { _id: { gameConfigs, id } }, doc);

        return {
            replaceOne: {
                filter: { gameConfigs, id },
                replacement: data,
                upsert: true,
            },
        };
    });

    const opsDB = db.getSiblingDB("ops_configs");
    {
        const res = await opsDB.getCollection("archive_configs").bulkWrite(bulkWrite, { ordered: false });
        log("I", "DATA", `[${opsDB.getName()}.archive_configs]`, `• ${stringifyResult(res)}`);
    }
})();
