deploy: {
  const dbs = DBs(db);
  const label = `archive_configs@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___data?.[label]) loadScript(`../../common/ops_configs/archive_configs-data.js`);

  const data = [...global.___data[label]];
  const commonConfig = { category: "games", type: 0 };

  /** { gameId: 1005, name: "seball1" } */
  {
    const gameConfigs = { gameId: 1005, name: "seball1" };
    [
      {
        ...commonConfig,
        id: 0,
        gameConfigs,
        from: { db: "minigame", postfix: "_rounds" },
        to: { db: "minigame_arc", postfix: "_rounds_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24, localField: "id" },
        childs: [
          { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$ne":null}}' },
          { from: { db: "minigame", postfix: "_betlogs" }, to: { db: "minigame_arc", postfix: "_betlogs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$ne":null}}' },
        ],
        log: { field: "_rounds", value: "id" },
      },
      {
        ...commonConfig,
        id: 1,
        gameConfigs,
        from: { db: "minigame", postfix: "_results" },
        to: { db: "minigame_arc", postfix: "_results_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24 * 8 },
      },
      {
        ...commonConfig,
        id: 2,
        gameConfigs,
        from: { db: "minigame", postfix: "_bets" },
        to: { db: "minigame_arc", postfix: "_bets_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24 * 8 },
        filter: '{"playerId":{"$ne":null}}',
      },
      {
        ...commonConfig,
        id: 3,
        gameConfigs,
        from: { db: "minigame", postfix: "_bets" },
        to: { db: "minigame_arc", postfix: "_bets_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24 * 8, updateOnly: true },
        filter: '{"playerId":null}',
      },
      {
        ...commonConfig,
        id: 4,
        gameConfigs,
        from: { db: "minigame", postfix: "_betlogs" },
        to: { db: "minigame_arc", postfix: "_betlogs_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24 * 8 },
        filter: '{"playerId":{"$ne":null}}',
      },
      {
        ...commonConfig,
        id: 5,
        gameConfigs,
        from: { db: "minigame", postfix: "_betlogs" },
        to: { db: "minigame_arc", postfix: "_betlogs_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24 * 8, updateOnly: true },
        filter: '{"playerId":null}',
      },
    ].forEach((config) => data.push(config));
  }

  /** { gameId: 1007, name: "sicball" } */
  {
    const gameConfigs = { gameId: 1007, name: "sicball" };
    [
      {
        ...commonConfig,
        id: 0,
        gameConfigs,
        from: { db: "minigame", postfix: "_rounds" },
        to: { db: "minigame_arc", postfix: "_rounds_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24, localField: "id" },
        childs: [
          { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$ne":null}}' },
          { from: { db: "minigame", postfix: "_betlogs" }, to: { db: "minigame_arc", postfix: "_betlogs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$ne":null}}' },
        ],
        log: { field: "_rounds", value: "id" },
      },
      {
        ...commonConfig,
        id: 1,
        gameConfigs,
        from: { db: "minigame", postfix: "_results" },
        to: { db: "minigame_arc", postfix: "_results_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24 * 8 },
      },
      {
        ...commonConfig,
        id: 2,
        gameConfigs,
        from: { db: "minigame", postfix: "_bets" },
        to: { db: "minigame_arc", postfix: "_bets_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24 * 8 },
        filter: '{"playerId":{"$ne":null}}',
      },
      {
        ...commonConfig,
        id: 3,
        gameConfigs,
        from: { db: "minigame", postfix: "_bets" },
        to: { db: "minigame_arc", postfix: "_bets_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24 * 8, updateOnly: true },
        filter: '{"playerId":null}',
      },
      {
        ...commonConfig,
        id: 4,
        gameConfigs,
        from: { db: "minigame", postfix: "_betlogs" },
        to: { db: "minigame_arc", postfix: "_betlogs_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24 * 8 },
        filter: '{"playerId":{"$ne":null}}',
      },
      {
        ...commonConfig,
        id: 5,
        gameConfigs,
        from: { db: "minigame", postfix: "_betlogs" },
        to: { db: "minigame_arc", postfix: "_betlogs_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24 * 8, updateOnly: true },
        filter: '{"playerId":null}',
      },
    ].forEach((config) => data.push(config));
  }

  const bulkWrite = data.map(({ gameConfigs, id, ...restData }) => ({
    replaceOne: {
      filter: { gameConfigs, id },
      replacement: { gameConfigs, id, ...restData },
      upsert: true,
    },
  }));
  const res = dbs.ops_configs.archive_configs.bulkWrite(bulkWrite, { ordered: false });
  $Log(`DATA`).info(`ops_configs.archive_configs`, `#-${res.matchedCount} • D-${res.deletedCount} • I-${res.insertedCount} • M-${res.modifiedCount} • U-${res.upsertedCount}`);
}
