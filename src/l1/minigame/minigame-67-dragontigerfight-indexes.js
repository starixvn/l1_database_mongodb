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
    betlogs: [idx.roundId__id, idx.playerId_roundId_F],
    bets: [idx.roundId__id, idx.playerId_roundId_F, idx.uid_roundId, idx.uid_paid__id],
  };
  const idxs = [
    $Indexes(dbs.minigame.dragontigerfight_rounds, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.dragontigerfight_betlogs, [idx.TTL, idx.time_archive, ...BL.betlogs]),
    $Indexes(dbs.minigame.dragontigerfight_bets, [idx.TTL, idx.time_archive, idx.currency, idx.__archive_summarized, idx.__archive_do_summary, ...BL.bets]),
    $Indexes(dbs.minigame.dragontigerfight_results, [idx.TTL, idx.time_archive, idx.roundId]),
    $Indexes(dbs.minigame.dragontigerfight_tmpbets, [idx.timeTTL, idx.roundId__id, idx.uid_roundId]),
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
    $Collection(dbs.minigame_arc.dragontigerfight_rounds_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.dragontigerfight_betlogs_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.dragontigerfight_bets_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.dragontigerfight_results_bk, { storageEngine }),
  ].forEach((_) => {
    _.create();
    _.validate();
  });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.dragontigerfight_rounds_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.dragontigerfight_betlogs_bk, [idx.roundId, idx.playerId_roundId_F, idx.uid_roundId]),
    $Indexes(dbs.minigame_arc.dragontigerfight_bets_bk, [idx.time, idx.roundId, idx.playerId_roundId_F, idx.uid_roundId_U]),
    $Indexes(dbs.minigame_arc.dragontigerfight_results_bk, [idx.roundId]),
  ];
  idxs.forEach((_) => _.deploy());
}
