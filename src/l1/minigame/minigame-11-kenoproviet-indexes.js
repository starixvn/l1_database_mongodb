/** L1 L2 -- */
deploy: {
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  loadScript(`../../common/minigame/minigame-game-indexes.js`);
  const idx = {
    ...___idx,
  };
  const idxs = [
    ...___idxs,
    $Indexes(dbs.minigame.kenoproviet_phiens    , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenoproviet_phien_logs, [idx.TTL]),
    $Indexes(dbs.minigame.kenoproviet_cuocs     , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenoproviet_ones      , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...___idx,
  };
  const idxs = [
    ...___idxs,
    $Indexes(dbs.minigame_arc.kenoproviet_phiens_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenoproviet_cuocs_bk  , [          idx.phien, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenoproviet_ones_bk   , [idx.time, idx.phien, idx.uid_phien_U]),
  ];
  idxs.forEach(_ => _.deploy());
}
