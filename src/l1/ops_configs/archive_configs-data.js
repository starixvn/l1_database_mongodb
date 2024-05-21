deploy: {
  const dbs = DBs(db);
  const label = `archive_configs@${dbs.toString()}`;
  const labelGame = `archive_configs-games@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___data?.[label]) loadScript(`../../common/ops_configs/archive_configs-data.js`);
  if (!global.___data?.[labelGame]) loadScript(`../../common/ops_configs/archive_configs-games-data.js`);

  const data = [...global.___data[label], ...global.___data[labelGame]];

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
