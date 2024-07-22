deploy: {
    const dbs = DBs(db);
    if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
    if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

    const commonConfig = { category: "games", type: 0, id: 0 };

    const summaryConfigs = [
        {
            ...commonConfig,
            gameConfigs: { gameId: 1005, name: "seball1" },
            db: "minigame",
            coll: { round: "_rounds", bet: "_bets" },
            aliases: { foreign: "roundId", playerId: "playerId", settled: "paid", time: "time", subRoundId: "drawId" },
            calc: {
                roundId: '"$id"',
                tickets: '{"$literal":1}',
                stake: '"$totalAmount"',
                payout: '"$betwin"',
                refund: '{"$literal":0}',
            },
        },
        {
            ...commonConfig,
            gameConfigs: { gameId: 1007, name: "sicball" },
            db: "minigame",
            coll: { round: "_rounds", bet: "_bets" },
            aliases: { foreign: "roundId", playerId: "playerId", settled: "paid", time: "time", subRoundId: "drawId" },
            calc: {
                roundId: '"$id"',
                tickets: '{"$literal":1}',
                stake: '"$totalAmount"',
                payout: '"$betwin"',
                refund: '{"$literal":0}',
            },
        },
    ];

    const bulkWrite = summaryConfigs.map((doc) => {
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

    const res = dbs.ops_configs.summary_configs.bulkWrite(bulkWrite, { ordered: false });
    $Log(`DATA`).info(`ops_configs.summary_configs`, `#=${res.matchedCount} • I+${res.insertedCount} • U+${res.upsertedCount} • M=${res.modifiedCount} • D-${res.deletedCount}`);
}
