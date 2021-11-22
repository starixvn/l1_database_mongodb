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
    $Indexes(dbs.minigame.kenopower1_phiens , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenopower1_cuocs  , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenopower1_ones   , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),

    $Indexes(dbs.minigame.kenopower2_phiens , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenopower2_cuocs  , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenopower2_ones   , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),
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
    $Indexes(dbs.minigame_arc.kenopower1_phiens_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenopower1_cuocs_bk , [          idx.phien, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenopower1_ones_bk  , [idx.time, idx.phien, idx.uid_phien_U]),

    $Indexes(dbs.minigame_arc.kenopower2_phiens_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenopower2_cuocs_bk , [          idx.phien, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenopower2_ones_bk  , [idx.time, idx.phien, idx.uid_phien_U]),
  ];
  idxs.forEach(_ => _.deploy());
}
