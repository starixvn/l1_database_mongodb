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
    $Indexes(dbs.minigame.fruitslot_rounds , [idx.TTL, idx.time, idx.id, idx.summarized_id]),
    $Indexes(dbs.minigame.fruitslot_betlogs, [idx.TTL,           idx.archive_time, idx.roundId__id, idx.playerId_roundId_F, idx.uid__id]),
    $Indexes(dbs.minigame.fruitslot_bets   , [idx.TTL, idx.time, idx.archive_time, idx.roundId__id, idx.playerId_roundId_F, idx.uid_roundId, idx.currency, idx.isCash]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs   = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  [ $Collection(dbs.minigame_arc.fruitslot_rounds_bk , {storageEngine}),
    $Collection(dbs.minigame_arc.fruitslot_betlogs_bk, {storageEngine}),
    $Collection(dbs.minigame_arc.fruitslot_bets_bk   , {storageEngine}),
  ].forEach(_ => { _.create(); _.validate(); });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.fruitslot_rounds_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.fruitslot_betlogs_bk, [          idx.roundId, idx.playerId_roundId_F, idx.uid_roundId]),
    $Indexes(dbs.minigame_arc.fruitslot_bets_bk   , [idx.time, idx.roundId, idx.playerId_roundId_F, idx.uid_roundId_U]),
  ];
  idxs.forEach(_ => _.deploy());
}
