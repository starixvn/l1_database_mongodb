/** L1 L2 -- */
deploy: {
  const dbs   = DBs(db);
  const label = `minigame-global_configs@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___data?.[label]) loadScript(`../../common/minigame/minigame-global_configs-data.js`);
  const data = {
    ...global.___data[label],
  };

  const bulkPipe = Object.keys(data).map(type => ({
    updateOne : {
      filter  : { type },
      update  : { $set: data[type] },
      upsert  : true,
    },
  }));
  const res = dbs.minigame.global_configs.bulkWrite(bulkPipe, {ordered: false});
  $Log(`DATA`).info(`minigame.global_configs`, `D-${res.deletedCount ?? 0} • I-${(res.insertedCount ?? 0) + (res.upsertedCount ?? 0)} • M-${res.matchedCount ?? 0} • U-${res.modifiedCount ?? 0}`);
}
