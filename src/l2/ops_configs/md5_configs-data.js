(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["archive", "mixed"].includes(stage)) return;

    const { md5Configs } = require("../../modules/ops_configs/md5_configs.cjs");

    /** @type { AnyBulkWriteOperation[] } */
    const bulkWrite = md5Configs.map((doc) => {
        const { _id } = doc;

        return {
            replaceOne: {
                filter: { _id },
                replacement: doc,
                upsert: true,
            },
        };
    });

    const opsDB = db.getSiblingDB("ops_configs");
    {
        const res = await opsDB.getCollection("md5_configs").bulkWrite(bulkWrite, { ordered: false });
        log("I", "DATA", `[${opsDB.getName()}.md5_configs]`, `• ${stringifyResult(res)}`);
    }
})();
