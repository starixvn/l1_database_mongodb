/** L1 L2 -- */
deploy: {
  const dbs = DBs(db);
  const label = `summary_configs@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___data?.[label]) loadScript(`../../common/ops_configs/summary_configs-data.js`);
  const data = [...global.___data[label]];

  const bulkWrite = data.map(({ gameConfigs, category, type, ...restData }) => ({
    updateOne: {
      filter: { gameConfigs, category, type },
      update: { $set: restData },
      upsert: true,
    },
  }));
  const res = dbs.ops_configs.summary_configs.bulkWrite(bulkWrite, { ordered: false });
  $Log(`DATA`).info(`ops_configs.summary_configs`, `#-${res.matchedCount} • D-${res.deletedCount} • I-${res.insertedCount} • M-${res.modifiedCount} • U-${res.upsertedCount}`);
}
