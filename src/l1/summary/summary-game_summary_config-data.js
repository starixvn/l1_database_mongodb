/** L1 L2 L3 */
deploy: {
  const dbs   = DBs(db);
  const label = `summary-game_summary_config@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___data?.[label]) loadScript(`../../common/summary/summary-game_summary_config-data.js`);
  const data = [
    ...global.___data[label],
  ];

  const del = dbs.summary.game_summary_config.deleteMany({});
  const res = dbs.summary.game_summary_config.insertMany(data, {ordered: false});
  $Log(`DATA`).info(`summary.game_summary_config`, `D-${del.deletedCount} • I-${Object.keys(res.insertedIds).length} • M-0 • U-0`);
}

deploy: {
  const dbs   = DBs(db);
  const label = `summary_arc-game_summary_config@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___data?.[label]) loadScript(`../../common/summary/summary_arc-game_summary_config-data.js`);
  const data = [
    ...global.___data[label],
  ];

  const del = dbs.summary_arc.game_summary_config.deleteMany({});
  const res = dbs.summary_arc.game_summary_config.insertMany(data, {ordered: false});
  $Log(`DATA`).info(`summary_arc.game_summary_config`, `D-${del.deletedCount} • I-${Object.keys(res.insertedIds).length} • M-0 • U-0`);
}
