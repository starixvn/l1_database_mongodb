/** L1 -- -- */
deploy: {
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  loadScript(`../../common/minigame/minigame-slot-indexes.js`);
  const idx = {
    ...___idx,
  };
  const idxs = [
    ...___idxs,
    $Indexes(dbs.minigame.heroesslot_rounds    , [idx.TTL, idx.time, idx.id, idx.paid_uid, idx.currency, idx.isCash]),
    $Indexes(dbs.minigame.heroesslot_freespins , [idx.TTL,           idx.id, idx.expiryTime]),
    $Indexes(dbs.minigame.heroesslot_fames     , [idx.TTL, idx.time, idx.uid_roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}
