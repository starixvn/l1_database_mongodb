deploy: {
  const dbs = DBs(db);
  const label = `minigame-statement@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = { wiredTiger: { configString: "block_compressor=zstd" } };
  [$Collection(dbs.minigame.ticket_silos, { storageEngine })].forEach((_) => {
    _.create();
    _.validate();
  });

  if (!global.___idx?.[label] || !global.___idxs?.[label]) loadScript(`../../common/minigame/minigame-statement-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [...global.___idxs[label]];
  idxs.forEach((_) => _.deploy());
}
