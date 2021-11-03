deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  loadScript(`../../common/summary/summary-game_summary_config-data.js`);
  const data = [
    ...___data,
  ];

  dbs.summary.game_summary_config.deleteMany({});
  res = dbs.summary.game_summary_config.insertMany(data, {ordered: false});
  $Log(`DATA`).info(`summary.game_summary_config`, `${Object.keys(res.insertedIds).length} docs inserted`);
}

deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  loadScript(`../../common/summary/summary_arc-game_summary_config-data.js`);
  const data = [
    ...___data,
  ];

  dbs.summary_arc.game_summary_config.deleteMany({});
  res = dbs.summary_arc.game_summary_config.insertMany(data, {ordered: false});
  $Log(`DATA`).info(`summary_arc.game_summary_config`, `${Object.keys(res.insertedIds).length} docs inserted`);
}
