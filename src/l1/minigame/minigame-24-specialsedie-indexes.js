/** L1 L2 -- */
deploy: {
  const label = `minigame-game`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
    BL_phien      : $Index({phien: 1}, {partialFilterExpression: {_id: {$lt: 0}}}),
    BL_uid_phien  : $Index({uid: 1, phien: 1}, {partialFilterExpression: {_id: {$lt: 0}}}),
  };
  const idxs = [
    $Indexes(dbs.minigame.specialsedie_phiens , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.specialsedie_cuocs  , [idx.TTL,           idx.phien__id, idx.uid_thanhtoan__id, idx.BL_phien, idx.BL_uid_phien]),
    $Indexes(dbs.minigame.specialsedie_ones   , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash, idx.BL_phien]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const label = `minigame_arc-game`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.specialsedie_phiens_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.specialsedie_cuocs_bk , [          idx.phien, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.specialsedie_ones_bk  , [idx.time, idx.phien, idx.uid_phien_U]),
  ];
  idxs.forEach(_ => _.deploy());
}
