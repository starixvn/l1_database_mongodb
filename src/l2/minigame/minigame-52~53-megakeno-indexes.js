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
    bets: {
      [1]: ($_ = [idx.roundId__id, idx.playerId_roundId_F]),
      [2]: $_,
      [3]: [idx.phien__id, idx.memberId_phien_F],
    }[L],
    ones: {
      [1]: ($_ = [idx.roundId__id, idx.playerId_roundId_F, idx.uid_roundId]),
      [2]: $_,
      [3]: [idx.phien__id, idx.memberId_phien_F, idx.uid_phien],
    }[L],
  };
  const idxs = [
    $Indexes(dbs.minigame.megakeno_rounds, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.megakeno_bets, [idx.TTL, idx.time_archive, idx.uid__id, ...BL.bets]),
    $Indexes(dbs.minigame.megakeno_ones, [idx.TTL, idx.time_archive, idx.currency, idx.__archive_summarized, idx.__archive_do_summary, ...BL.ones]),
    $Indexes(dbs.minigame.megakeno_tmpbets, [idx.timeTTL, idx.roundId__id, idx.uid_roundId]),
    $Indexes(dbs.minigame.megakeno_results, [idx.TTL, idx.time_archive, idx.roundId]),

    $Indexes(dbs.minigame.megakeno2_rounds, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.megakeno2_bets, [idx.TTL, idx.time_archive, idx.uid__id, ...BL.bets]),
    $Indexes(dbs.minigame.megakeno2_ones, [idx.TTL, idx.time_archive, idx.currency, idx.__archive_summarized, idx.__archive_do_summary, ...BL.ones]),
    $Indexes(dbs.minigame.megakeno2_tmpbets, [idx.timeTTL, idx.roundId__id, idx.uid_roundId]),
    $Indexes(dbs.minigame.megakeno2_results, [idx.TTL, idx.time_archive, idx.roundId]),
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
    $Collection(dbs.minigame_arc.megakeno_rounds_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.megakeno_bets_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.megakeno_ones_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.megakeno_results_bk, { storageEngine }),

    $Collection(dbs.minigame_arc.megakeno2_rounds_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.megakeno2_bets_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.megakeno2_ones_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.megakeno2_results_bk, { storageEngine }),
  ].forEach((_) => {
    _.create();
    _.validate();
  });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.megakeno_rounds_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.megakeno_bets_bk, [idx.roundId, idx.playerId_roundId_F, idx.uid_roundId]),
    $Indexes(dbs.minigame_arc.megakeno_ones_bk, [idx.time, idx.roundId, idx.playerId_roundId_F, idx.uid_roundId_U]),
    $Indexes(dbs.minigame_arc.megakeno_results_bk, [idx.roundId]),

    $Indexes(dbs.minigame_arc.megakeno2_rounds_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.megakeno2_bets_bk, [idx.roundId, idx.playerId_roundId_F, idx.uid_roundId]),
    $Indexes(dbs.minigame_arc.megakeno2_ones_bk, [idx.time, idx.roundId, idx.playerId_roundId_F, idx.uid_roundId_U]),
    $Indexes(dbs.minigame_arc.megakeno2_results_bk, [idx.roundId]),
  ];
  idxs.forEach((_) => _.deploy());
}
