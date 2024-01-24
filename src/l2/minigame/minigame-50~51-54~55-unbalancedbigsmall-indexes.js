/** L1 L2 -- */
deploy: {
  const dbs = DBs(db);
  const label = `minigame-game@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;
  if (path.basename(path.resolve(`..`)) != `l${L}`) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const BL = {
    betlogs:  [idx.roundId__id, idx.playerId_roundId_F, idx.uid_paid__id],
    bets:  [idx.roundId__id, idx.playerId_roundId_F, idx.uid_roundId],
  };
  const idxs = [
    $Indexes(dbs.minigame.unbalancedbigsmall1_rounds, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.unbalancedbigsmall1_betlogs, [idx.TTL, idx.time_archive, ...BL.betlogs]),
    $Indexes(dbs.minigame.unbalancedbigsmall1_bets, [idx.TTL, idx.time_archive, idx.currency, idx.__archive_summarized, idx.__archive_do_summary, ...BL.bets]),
    $Indexes(dbs.minigame.unbalancedbigsmall1_results, [idx.TTL, idx.time_archive, idx.roundId]),

    $Indexes(dbs.minigame.unbalancedbigsmall2_rounds, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.unbalancedbigsmall2_betlogs, [idx.TTL, idx.time_archive, ...BL.betlogs]),
    $Indexes(dbs.minigame.unbalancedbigsmall2_bets, [idx.TTL, idx.time_archive, idx.currency, idx.__archive_summarized, idx.__archive_do_summary, ...BL.bets]),
    $Indexes(dbs.minigame.unbalancedbigsmall2_results, [idx.TTL, idx.time_archive, idx.roundId]),

    $Indexes(dbs.minigame.unbalancedbigsmall3_rounds, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.unbalancedbigsmall3_betlogs, [idx.TTL, idx.time_archive, ...BL.betlogs]),
    $Indexes(dbs.minigame.unbalancedbigsmall3_bets, [idx.TTL, idx.time_archive, idx.currency, idx.__archive_summarized, idx.__archive_do_summary, ...BL.bets]),
    $Indexes(dbs.minigame.unbalancedbigsmall3_results, [idx.TTL, idx.time_archive, idx.roundId]),

    $Indexes(dbs.minigame.unbalancedbigsmall4_rounds, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.unbalancedbigsmall4_betlogs, [idx.TTL, idx.time_archive, ...BL.betlogs]),
    $Indexes(dbs.minigame.unbalancedbigsmall4_bets, [idx.TTL, idx.time_archive, idx.currency, idx.__archive_summarized, idx.__archive_do_summary, ...BL.bets]),
    $Indexes(dbs.minigame.unbalancedbigsmall4_results, [idx.TTL, idx.time_archive, idx.roundId]),
  ];
  idxs.forEach((_) => _.deploy());
}

deploy: {
  const dbs = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = { wiredTiger: { configString: "block_compressor=zstd" } };
  [
    $Collection(dbs.minigame_arc.unbalancedbigsmall1_rounds_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.unbalancedbigsmall1_betlogs_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.unbalancedbigsmall1_bets_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.unbalancedbigsmall1_results_bk, { storageEngine }),

    $Collection(dbs.minigame_arc.unbalancedbigsmall2_rounds_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.unbalancedbigsmall2_betlogs_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.unbalancedbigsmall2_bets_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.unbalancedbigsmall2_results_bk, { storageEngine }),

    $Collection(dbs.minigame_arc.unbalancedbigsmall3_rounds_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.unbalancedbigsmall3_betlogs_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.unbalancedbigsmall3_bets_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.unbalancedbigsmall3_results_bk, { storageEngine }),

    $Collection(dbs.minigame_arc.unbalancedbigsmall4_rounds_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.unbalancedbigsmall4_betlogs_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.unbalancedbigsmall4_bets_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.unbalancedbigsmall4_results_bk, { storageEngine }),
  ].forEach((_) => {
    _.create();
    _.validate();
  });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.unbalancedbigsmall1_rounds_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.unbalancedbigsmall1_betlogs_bk, [idx.roundId, idx.playerId_roundId_F, idx.uid_roundId]),
    $Indexes(dbs.minigame_arc.unbalancedbigsmall1_bets_bk, [idx.time, idx.roundId, idx.playerId_roundId_F, idx.uid_roundId_U]),
    $Indexes(dbs.minigame_arc.unbalancedbigsmall1_results_bk, [idx.roundId]),

    $Indexes(dbs.minigame_arc.unbalancedbigsmall2_rounds_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.unbalancedbigsmall2_betlogs_bk, [idx.roundId, idx.playerId_roundId_F, idx.uid_roundId]),
    $Indexes(dbs.minigame_arc.unbalancedbigsmall2_bets_bk, [idx.time, idx.roundId, idx.playerId_roundId_F, idx.uid_roundId_U]),
    $Indexes(dbs.minigame_arc.unbalancedbigsmall2_results_bk, [idx.roundId]),

    $Indexes(dbs.minigame_arc.unbalancedbigsmall3_rounds_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.unbalancedbigsmall3_betlogs_bk, [idx.roundId, idx.playerId_roundId_F, idx.uid_roundId]),
    $Indexes(dbs.minigame_arc.unbalancedbigsmall3_bets_bk, [idx.time, idx.roundId, idx.playerId_roundId_F, idx.uid_roundId_U]),
    $Indexes(dbs.minigame_arc.unbalancedbigsmall3_results_bk, [idx.roundId]),

    $Indexes(dbs.minigame_arc.unbalancedbigsmall4_rounds_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.unbalancedbigsmall4_betlogs_bk, [idx.roundId, idx.playerId_roundId_F, idx.uid_roundId]),
    $Indexes(dbs.minigame_arc.unbalancedbigsmall4_bets_bk, [idx.time, idx.roundId, idx.playerId_roundId_F, idx.uid_roundId_U]),
    $Indexes(dbs.minigame_arc.unbalancedbigsmall4_results_bk, [idx.roundId]),
  ];
  idxs.forEach((_) => _.deploy());
}
