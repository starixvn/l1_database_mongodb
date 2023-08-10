/** L1 L2 -- */
deploy: {
  const dbs   = DBs(db);
  const label = `minigame-game@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;
  if (path.basename(path.resolve(`..`)) != `l${L}`) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame.minisedie2_rounds , [idx.TTL, idx.time, idx.id, idx.__archive_summarized, idx.__archive_do_summary]),
    $Indexes(dbs.minigame.minisedie2_bets   , [idx.TTL, idx.time_archive, idx.roundId__id, idx.playerId_roundId_F, idx.uid_roundId_U, idx.uid_paid__id, idx.currency, idx.isCash]),
    $Indexes(dbs.minigame.minisedie2_results, [idx.TTL, idx.time_archive, idx.roundId]),

    $Indexes(dbs.minigame.minisedie3_rounds , [idx.TTL, idx.time, idx.id, idx.__archive_summarized, idx.__archive_do_summary]),
    $Indexes(dbs.minigame.minisedie3_bets   , [idx.TTL, idx.time_archive, idx.roundId__id, idx.playerId_roundId_F, idx.uid_roundId_U, idx.uid_paid__id, idx.currency, idx.isCash]),
    $Indexes(dbs.minigame.minisedie3_results, [idx.TTL, idx.time_archive, idx.roundId]),

    $Indexes(dbs.minigame.minisedie4_rounds , [idx.TTL, idx.time, idx.id, idx.__archive_summarized, idx.__archive_do_summary]),
    $Indexes(dbs.minigame.minisedie4_bets   , [idx.TTL, idx.time_archive, idx.roundId__id, idx.playerId_roundId_F, idx.uid_roundId_U, idx.uid_paid__id, idx.currency, idx.isCash]),
    $Indexes(dbs.minigame.minisedie4_results, [idx.TTL, idx.time_archive, idx.roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs   = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  [ $Collection(dbs.minigame_arc.minisedie2_rounds_bk , {storageEngine}),
    $Collection(dbs.minigame_arc.minisedie2_bets_bk   , {storageEngine}),
    $Collection(dbs.minigame_arc.minisedie2_results_bk, {storageEngine}),

    $Collection(dbs.minigame_arc.minisedie3_rounds_bk , {storageEngine}),
    $Collection(dbs.minigame_arc.minisedie3_bets_bk   , {storageEngine}),
    $Collection(dbs.minigame_arc.minisedie3_results_bk, {storageEngine}),

    $Collection(dbs.minigame_arc.minisedie4_rounds_bk , {storageEngine}),
    $Collection(dbs.minigame_arc.minisedie4_bets_bk   , {storageEngine}),
    $Collection(dbs.minigame_arc.minisedie4_results_bk, {storageEngine}),
  ].forEach(_ => { _.create(); _.validate(); });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.minisedie2_rounds_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.minisedie2_bets_bk   , [idx.time, idx.roundId, idx.playerId_roundId_F, idx.uid_roundId_U]),
    $Indexes(dbs.minigame_arc.minisedie2_results_bk, [          idx.roundId]),

    $Indexes(dbs.minigame_arc.minisedie3_rounds_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.minisedie3_bets_bk   , [idx.time, idx.roundId, idx.playerId_roundId_F, idx.uid_roundId_U]),
    $Indexes(dbs.minigame_arc.minisedie3_results_bk, [          idx.roundId]),

    $Indexes(dbs.minigame_arc.minisedie4_rounds_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.minisedie4_bets_bk   , [idx.time, idx.roundId, idx.playerId_roundId_F, idx.uid_roundId_U]),
    $Indexes(dbs.minigame_arc.minisedie4_results_bk, [          idx.roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}
