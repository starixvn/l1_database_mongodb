deploy: {
    const dbs = DBs(db);
    const { L } = dbs._mongo._identity;
    if (path.basename(path.resolve(`..`)) != `l${L}`) break deploy;
    if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

    const { gameSummaryConfig } = require("../../modules/summary/summary-game_summary_config.cjs");

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

    {
        const res = dbs.summary.game_summary_config.bulkWrite(bulkWrite, { ordered: false });
        $Log("DATA").info("summary.game_summary_config", `#=${res.matchedCount} • I+${res.insertedCount} • U+${res.upsertedCount} • M=${res.modifiedCount} • D-${res.deletedCount}`);
    }
}
