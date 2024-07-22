deploy: {
    const dbs = DBs(db);
    if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
    if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

    const summaryTemplates = [
        {
            category: "games",
            type: 6,
            targets: [{ db: "ops_configs", coll: "summary_configs" }],
            data: [
                {
                    db: "minigame",
                    coll: { round: "_rounds", bet: "_bets" },
                    aliases: { foreign: "roundId", playerId: "playerId", settled: "paid", time: "time" },
                    calc: {
                        roundId: '"$id"',
                        tickets: '{"$literal":1}',
                        stake: '{"$multiply":["$totalAmount",{"$toInt":{"$not":"$freeBet"}}]}',
                        payout: '"$betwin"',
                        refund: '{"$literal":0}',
                    },
                },
            ],
        },
    ];

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

    const res = dbs.ops_configs.summary_templates.bulkWrite(bulkWrite, { ordered: false });
    $Log(`DATA`).info(`ops_configs.summary_templates`, `#=${res.matchedCount} • I+${res.insertedCount} • U+${res.upsertedCount} • M=${res.modifiedCount} • D-${res.deletedCount}`);
}
