/** L1 L2 -- */
deploy: {
  const label = `minigame-slot`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame-slot-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame.fourguardians_rounds    , [idx.TTL, idx.time, idx.id, idx.paid_uid, idx.currency, idx.isCash]),
    $Indexes(dbs.minigame.fourguardians_freespins , [idx.TTL,           idx.id, idx.expiryTime]),
    $Indexes(dbs.minigame.fourguardians_fames     , [idx.TTL, idx.time, idx.uid_roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const label = `minigame_arc-slot`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-slot-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.fourguardians_rounds_bk   , [idx.time, idx.id, idx.uid_id]),
    $Indexes(dbs.minigame_arc.fourguardians_freespins_bk, [          idx.id, idx.expiryTime]),
    $Indexes(dbs.minigame_arc.fourguardians_fames_bk    , [idx.time, idx.uid_roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}
