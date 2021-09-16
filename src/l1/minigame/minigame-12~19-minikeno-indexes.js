/** L1 L2 L3 */
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
    $Indexes(dbs.minigame.kenomax_phiens, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenomax_cuocs , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenomax_ones  , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),

    $Indexes(dbs.minigame.kenomax2_phiens , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenomax2_cuocs  , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenomax2_ones   , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),

    $Indexes(dbs.minigame.kenomini_phiens , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenomini_cuocs  , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenomini_ones   , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),

    $Indexes(dbs.minigame.kenomini2_phiens, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenomini2_cuocs , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenomini2_ones  , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),

    $Indexes(dbs.minigame.kenoeast_phiens , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenoeast_cuocs  , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenoeast_ones   , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),

    $Indexes(dbs.minigame.kenoeast_phiens , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenoeast_cuocs  , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenoeast_ones   , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),

    $Indexes(dbs.minigame.kenosouth_phiens, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenosouth_cuocs , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenosouth_ones  , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),

    $Indexes(dbs.minigame.kenonorth_phiens, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenonorth_cuocs , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenonorth_ones  , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),
  ];
  idxs.forEach(_ => _.deploy());
}
