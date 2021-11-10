/** L1 L2 L3 */
deploy: {
  const label = `archive_config`;
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___data?.[label]) loadScript(`../../common/archive/archive_config-data.js`);
  const data = [
    ...global.___data[label],
  ];

  dbs.archive.archive_config.deleteMany({});
  res = dbs.archive.archive_config.insertMany(data, {ordered: false});
  $Log(`DATA`).info(`archive.archive_config`, `${Object.keys(res.insertedIds).length} docs inserted`);
}
