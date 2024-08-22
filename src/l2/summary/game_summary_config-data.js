(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve(`..`)) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { gameSummaryConfig } = require("../../modules/summary/game_summary_config-data.cjs");

    /** @type { AnyBulkWriteOperation[] } */
    const bulkWrite = gameSummaryConfig(L).map((doc) => {
        const { gameId } = doc;
        const data = Object.assign({}, { _id: { gameId } }, doc);

        return {
            replaceOne: {
                filter: { gameId },
                replacement: data,
                upsert: true,
            },
        };
    });

    bulkWrite.push({
        deleteMany: {
            filter: {
                gameId: { $nin: gameSummaryConfig(L).map(({ gameId }) => gameId) },
            },
        },
    });

    const sumDB = db.getSiblingDB("summary");
    {
        const res = await sumDB.getCollection("game_summary_config").bulkWrite(bulkWrite, { ordered: false });
        log("I", "DATA", `[${sumDB.getName()}.game_summary_config]`, `• ${stringifyResult(res)}`);
    }
})();
