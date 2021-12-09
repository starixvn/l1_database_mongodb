/** L1 L2 -- */
deploy: {
  const label = `minigame-game`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame.vipfishprawncrab_phiens   , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.vipfishprawncrab_cuocs    , [idx.TTL, idx.time, idx.phien__id, idx.memberId_phien_F, idx.uid_phien, idx.uid_thanhtoan__id, idx.currency, idx.isCash]),
    $Indexes(dbs.minigame.vipfishprawncrab_tmpcuocs , [idx.timeTTL,       idx.phien__id, idx.uid_phien]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const label = `minigame_arc-game`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  [ $Collection(dbs.minigame_arc.vipfishprawncrab_phiens_bk, {storageEngine}),
    $Collection(dbs.minigame_arc.vipfishprawncrab_cuocs_bk , {storageEngine}),
  ].forEach(_ => { _.create(); _.validate(); });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.vipfishprawncrab_phiens_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.vipfishprawncrab_cuocs_bk , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
  ];
  idxs.forEach(_ => _.deploy());
}
