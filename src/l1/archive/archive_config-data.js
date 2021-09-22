deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  loadScript(`../../common/archive/archive_config-data.js`);
  const data = {
    ...___data,
  };

  dbs.archive.archive_config.deleteMany({});
  dbs.archive.archive_config.insertMany(data, {ordered: false});
}
