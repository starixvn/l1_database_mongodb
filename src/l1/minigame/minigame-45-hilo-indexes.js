/** L1 -- -- */
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
  const BL = {
    rounds: {
      [1]: ($_ = [idx.playerId_id_F]), [2]: $_, [3]: [],
    }[L],
    betlogs: {
      [1]: ($_ = [idx.playerId_roundId_F]), [2]: $_, [3]: [],
    }[L],
  };
  const idxs = [
    $Indexes(dbs.minigame.hilo_rounds  , [idx.TTL, idx.time, idx.endTime, idx.id, idx.memberId_id_F, idx.currency, idx.isCash, ...BL.rounds]),
    $Indexes(dbs.minigame.hilo_betlogs , [idx.TTL,           idx.roundId_uid, idx.memberId_roundId_F, ...BL.betlogs]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs   = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  [ $Collection(dbs.minigame_arc.hilo_rounds_bk , {storageEngine}),
    $Collection(dbs.minigame_arc.hilo_betlogs_bk, {storageEngine}),
  ].forEach(_ => { _.create(); _.validate(); });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.hilo_rounds_bk , [idx.time, idx.id, idx.endTime, idx.memberId_id_F]),
    $Indexes(dbs.minigame_arc.hilo_betlogs_bk, [          idx.roundId, idx.uid_roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}
