deploy: {
  const dbs = DBs(db);
  const label = `summary_templates@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;

  if (![1, 2, 3].includes(L)) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  (global.___data = global.___data ?? {})[label] = [
    {
      category: "games",
      type: 2,
      targets: [{ db: "ops_configs", coll: "summary_configs" }],
      data: [
        {
          db: "minigame",
          coll: { round: "_rounds" },
          filter: '{"paid":true}',
          aliases: {
            local: "id",
            playerId: "playerId",
            settled: "paid",
            time: "time",
          },
          calc: {
            tickets: '{"$literal":1}',
            stake: '{"$multiply":["$totalAmount",{"$toInt":{"$not":"$freeSpin"}}]}',
            payout: '"$betWin"',
            refund: '{"$literal":0}',
          },
        },
      ],
    },
    {
      category: "games",
      type: 3,
      targets: [{ db: "ops_configs", coll: "summary_configs" }],
      data: [
        {
          db: "minigame",
          coll: { round: "_rounds" },
          filter: '{"paid":true}',
          aliases: {
            local: "id",
            playerId: "playerId",
            settled: "paid",
            time: "time",
          },
          calc: {
            tickets: '{"$literal":1}',
            stake: '{"$multiply":["$totalAmount",{"$toInt":{"$not":"$freeSpin"}}]}',
            payout: '"$betWin"',
            refund: '{"$literal":0}',
          },
        },
      ],
    },
  ];
}
