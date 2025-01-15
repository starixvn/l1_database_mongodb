(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    /** @type { BsonDocument[] } */
    const changeStreamConfigs = [
        { ns: { db: "hotdog_minigame", coll: "game_configs" }, event: "GAME" },
        { ns: { db: "ops_configs", coll: "index_templates" }, event: "INDEX" },
        { ns: { db: "ops_configs", coll: "summary_templates" }, event: "SUMMARY" },
        { ns: { db: "ops_configs", coll: "archive_templates" }, event: "ARCHIVE" },
    ];

    /** @type { AnyBulkWriteOperation[] } */
    const bulkWrite = changeStreamConfigs.map((doc) => {
        const { ns } = doc;
        const _id = ns;
        const data = Object.assign({}, { _id }, doc);

        return {
            replaceOne: {
                filter: { _id },
                replacement: data,
                upsert: true,
            },
        };
    });

    const opsDB = db.getSiblingDB("ops_configs");
    {
        const res = await opsDB.getCollection("change_stream_configs").bulkWrite(bulkWrite, { ordered: false });
        log("I", "DATA", `[${opsDB.getName()}.change_stream_configs]`, `• ${stringifyResult(res)}`);
    }

    const nsIds = changeStreamConfigs.map(({ ns }) => ns);
    {
        const res = await opsDB.getCollection("change_stream_configs").deleteMany({ _id: { $nin: nsIds } });
        log("I", "DATA", `[${opsDB.getName()}.change_stream_configs]`, `• ${stringifyResult(res)}`);
    }
})();
