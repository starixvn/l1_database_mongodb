(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const summaryTemplates = [];

    /** @type { AnyBulkWriteOperation[] } */
    const bulkWrite = summaryTemplates.map((doc) => {
        const { category, type } = doc;
        const data = Object.assign({}, { _id: { category, type } }, doc);

        return {
            replaceOne: {
                filter: { category, type },
                replacement: data,
                upsert: true,
            },
        };
    });

    const opsDB = db.getSiblingDB("ops_configs");
    if (bulkWrite.length) {
        const res = await opsDB.getCollection("summary_templates").bulkWrite(bulkWrite, { ordered: false });
        log("I", "DATA", `[${opsDB.getName()}.summary_templates]`, `• ${stringifyResult(res)}`);
    }
})();
