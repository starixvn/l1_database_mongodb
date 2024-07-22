deploy: {
  const dbs = DBs(db);
  const label = `minigame-misc@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = { wiredTiger: { configString: "block_compressor=zstd" } };
  [$Collection(dbs.minigame.notification_service_events, { storageEngine })].forEach((_) => {
    _.create();
    _.validate();
  });

  const idxs = [$Indexes(dbs.minigame.notification_service_events, [$Index({ createdAt: 1 }), $Index({ "__archive.eventtime": 1 }, { expireAfterSeconds: 3600 })])];
  idxs.forEach((_) => _.deploy());
}
