/** L1 L2 */
deploy: {
  const dbs = DBs(db);
  const label = `summary-game_summary_config@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___data?.[label]) loadScript(`../../common/summary/summary-game_summary_config-data.js`);
  const data = [...global.___data[label]];

  const actions = data.map(({ gameId, ...data }) => ({ updateOne: { filter: { gameId }, update: { $set: data }, upsert: true } }));
  actions.push({ deleteMany: { filter: { gameId: { $nin: data.map(({ gameId }) => gameId) } } } });

  {
    const res = dbs.summary.game_summary_config.bulkWrite(actions, { ordered: false });
    $Log("DATA").info("summary.game_summary_config", `#-${res.matchedCount} • I+${res.insertedCount} • U+${res.upsertedCount} • M=${res.modifiedCount} • D-${res.deletedCount}`);
  }
}
