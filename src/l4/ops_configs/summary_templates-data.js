deploy: {
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const data = [
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

  const bulkWrite = data.map(({ category, type, ...restData }) => ({
    updateOne: {
      filter: { category, type },
      update: { $set: restData },
      upsert: true,
    },
  }));
  const res = dbs.ops_configs.summary_templates.bulkWrite(bulkWrite, { ordered: false });
  $Log(`DATA`).info(`ops_configs.summary_templates`, `#-${res.matchedCount} • D-${res.deletedCount} • I-${res.insertedCount} • M-${res.modifiedCount} • U-${res.upsertedCount}`);
}
