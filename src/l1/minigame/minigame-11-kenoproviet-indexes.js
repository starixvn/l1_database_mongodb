/** L1 L2 -- */
deploy: {
  const dbs   = DBs(db);
  const label = `minigame-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame.kenoproviet_phiens    , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenoproviet_phiens_log, [idx.TTL]),
    $Indexes(dbs.minigame.kenoproviet_cuocs     , [idx.TTL,           idx.phien__id, idx.memberId_phien_F, idx.uid__id]),
    $Indexes(dbs.minigame.kenoproviet_ones      , [idx.TTL, idx.time, idx.phien__id, idx.memberId_phien_F, idx.uid_phien, idx.currency, idx.isCash]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs   = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  [ $Collection(dbs.minigame_arc.kenoproviet_phiens_bk, {storageEngine}),
    $Collection(dbs.minigame_arc.kenoproviet_cuocs_bk , {storageEngine}),
    $Collection(dbs.minigame_arc.kenoproviet_ones_bk  , {storageEngine}),
  ].forEach(_ => { _.create(); _.validate(); });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.kenoproviet_phiens_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenoproviet_cuocs_bk  , [          idx.phien, idx.memberId_phien_F, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenoproviet_ones_bk   , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
  ];
  idxs.forEach(_ => _.deploy());
}
