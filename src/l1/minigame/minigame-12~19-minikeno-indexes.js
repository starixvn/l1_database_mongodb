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
    $Indexes(dbs.minigame.kenomax_phiens  , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenomax_cuocs   , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenomax_ones    , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),

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

    $Indexes(dbs.minigame.kenowest_phiens , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenowest_cuocs  , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenowest_ones   , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),

    $Indexes(dbs.minigame.kenosouth_phiens, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenosouth_cuocs , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenosouth_ones  , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),

    $Indexes(dbs.minigame.kenonorth_phiens, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.kenonorth_cuocs , [idx.TTL,           idx.phien__id, idx.uid__id]),
    $Indexes(dbs.minigame.kenonorth_ones  , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),
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
    $Indexes(dbs.minigame_arc.kenomax_phiens_bk   , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenomax_cuocs_bk    , [          idx.phien, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenomax_ones_bk     , [idx.time, idx.phien, idx.uid_phien_U]),

    $Indexes(dbs.minigame_arc.kenomax2_phiens_bk  , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenomax2_cuocs_bk   , [          idx.phien, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenomax2_ones_bk    , [idx.time, idx.phien, idx.uid_phien_U]),

    $Indexes(dbs.minigame_arc.kenomini_phiens_bk  , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenomini_cuocs_bk   , [          idx.phien, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenomini_ones_bk    , [idx.time, idx.phien, idx.uid_phien_U]),

    $Indexes(dbs.minigame_arc.kenomini2_phiens_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenomini2_cuocs_bk  , [          idx.phien, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenomini2_ones_bk   , [idx.time, idx.phien, idx.uid_phien_U]),

    $Indexes(dbs.minigame_arc.kenoeast_phiens_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenoeast_cuocs_bk  , [          idx.phien, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenoeast_ones_bk   , [idx.time, idx.phien, idx.uid_phien_U]),

    $Indexes(dbs.minigame_arc.kenowest_phiens_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenowest_cuocs_bk  , [          idx.phien, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenowest_ones_bk   , [idx.time, idx.phien, idx.uid_phien_U]),

    $Indexes(dbs.minigame_arc.kenosouth_phiens_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenosouth_cuocs_bk , [          idx.phien, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenosouth_ones_bk  , [idx.time, idx.phien, idx.uid_phien_U]),

    $Indexes(dbs.minigame_arc.kenonorth_phiens_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenonorth_cuocs_bk , [          idx.phien, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenonorth_ones_bk  , [idx.time, idx.phien, idx.uid_phien_U]),
  ];
  idxs.forEach(_ => _.deploy());
}
