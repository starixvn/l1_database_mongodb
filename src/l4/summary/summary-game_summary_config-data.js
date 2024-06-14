/** L1 L2 */
deploy: {
  const dbs = DBs(db);
  const label = `summary-game_summary_config@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const data = [
    {
      gameId: 1001,
      owGameTypeId: 10801,
      name: { en: "Bac Ball 1", vi: "Bac Ball 1", grp: "Bac Ball", game: "Bac Ball" },
      coll: { db: "minigame", group: "bacball1", round: "_rounds", postfix: "_bets" },
    },
    {
      gameId: 1002,
      owGameTypeId: 10802,
      name: { en: "Bac Ball 2", vi: "Bac Ball 2", grp: "Bac Ball", game: "Bac Ball" },
      coll: { db: "minigame", group: "bacball2", round: "_rounds", postfix: "_bets" },
    },
    {
      gameId: 1003,
      owGameTypeId: 10803,
      name: { en: "Lucky Next 1", vi: "Lucky Next 1", grp: "Lucky Next", game: "Lucky Next" },
      coll: { db: "minigame", group: "luckynext1", round: "_rounds", postfix: "_bets" },
    },
    {
      gameId: 1004,
      owGameTypeId: 10804,
      name: { en: "Lucky Next 2", vi: "Lucky Next 2", grp: "Lucky Next", game: "Lucky Next" },
      coll: { db: "minigame", group: "luckynext2", round: "_rounds", postfix: "_bets" },
    },
    {
      gameId: 1005,
      owGameTypeId: 10805,
      name: { en: "Se Ball", vi: "Se Ball", grp: "Se Ball", game: "Se Ball" },
      coll: { db: "minigame", group: "seball1", round: "_rounds", postfix: "_bets" },
    },
  ];

  const actions = data.map(({ gameId, ...data }) => ({ updateOne: { filter: { gameId }, update: { $set: data }, upsert: true } }));
  actions.push({ deleteMany: { filter: { gameId: { $nin: data.map(({ gameId }) => gameId) } } } });

  {
    const res = dbs.summary.game_summary_config.bulkWrite(actions, { ordered: false });
    $Log("DATA").info("summary.game_summary_config", `#-${res.matchedCount} • I+${res.insertedCount} • U+${res.upsertedCount} • M=${res.modifiedCount} • D-${res.deletedCount}`);
  }
}
