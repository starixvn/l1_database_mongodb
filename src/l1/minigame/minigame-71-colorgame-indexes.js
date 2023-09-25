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
    $Indexes(dbs.minigame.colorgame_rounds, [idx.TTL, idx.time, idx.id, idx.__archive_summarized, idx.__archive_do_summary]),
    $Indexes(dbs.minigame.colorgame_betlogs, [idx.TTL, idx.time_archive, ...BL.betlogs]),
    $Indexes(dbs.minigame.colorgame_bets, [idx.TTL, idx.time_archive, idx.currency, ...BL.bets]),
    $Indexes(dbs.minigame.colorgame_tmpbets, [idx.timeTTL, idx.roundId__id, idx.uid_roundId]),
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
    $Collection(dbs.minigame_arc.colorgame_rounds_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.colorgame_betlogs_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.colorgame_bets_bk, { storageEngine }),
  ].forEach((_) => {
    _.create();
    _.validate();
  });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.colorgame_rounds_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.colorgame_betlogs_bk, [idx.roundId, idx.playerId_roundId_F, idx.uid_roundId]),
    $Indexes(dbs.minigame_arc.colorgame_bets_bk, [idx.time, idx.roundId, idx.playerId_roundId_F, idx.uid_roundId_U]),
  ];
  idxs.forEach((_) => _.deploy());
}
