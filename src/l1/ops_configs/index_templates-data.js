(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { _id, L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { indexTemplates } = require("../../modules/ops_configs/index_templates.cjs");

    /** @type { AnyBulkWriteOperation[] } */
    const bulkWrite = indexTemplates.map((doc) => {
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
    {
        const res = await opsDB.getCollection("index_templates").bulkWrite(bulkWrite, { ordered: false });
        log("I", "DATA", `[${opsDB.getName()}.index_templates]`, `• ${stringifyResult(res)}`);
    }

    if (/SIT$/.test(_id)) {
        opsDB.getCollection("index_templates").updateOne(
            { type: 5 }, // -
            { $set: { "colls.$[i].idxs.TTL": '{"key":{"__archive.eventtime":1},"expireAfterSeconds":259200}' } },
            { arrayFilters: [{ "i.ns.postfix": "_livegamelogs" }] },
        );
    }
})();
