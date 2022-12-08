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
  const BL = {
    cuocs: {
      [1]: ($_ = [idx.roundId__id, idx.playerId_roundId_F, idx.uid_paid__id]), [2]: $_,
      [3]: [idx.phien__id, idx.memberId_phien_F, idx.uid_thanhtoan__id],
    }[L],
    ones: {
      [1]: ($_ = [idx.roundId__id, idx.playerId_roundId_F, idx.uid_roundId]), [2]: $_,
      [3]: [idx.phien__id, idx.memberId_phien_F, idx.uid_phien],
    }[L],
  };
  const idxs = [
    $Indexes(dbs.minigame.sicbo_phiens  , [idx.TTL, idx.time, idx.id, idx.summarized_id]),
    $Indexes(dbs.minigame.sicbo_cuocs   , [idx.TTL, idx.time_archive, ...BL.cuocs]),
    $Indexes(dbs.minigame.sicbo_ones    , [idx.TTL, idx.time_archive, idx.currency, idx.isCash, ...BL.ones]),
    $Indexes(dbs.minigame.sicbo_results , [idx.TTL, idx.time_archive, idx.roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs   = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  [ $Collection(dbs.minigame_arc.sicbo_phiens_bk , {storageEngine}),
    $Collection(dbs.minigame_arc.sicbo_cuocs_bk  , {storageEngine}),
    $Collection(dbs.minigame_arc.sicbo_ones_bk   , {storageEngine}),
    $Collection(dbs.minigame_arc.sicbo_results_bk, {storageEngine}),
  ].forEach(_ => { _.create(); _.validate(); });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.sicbo_phiens_bk   , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.sicbo_cuocs_bk    , [          idx.phien, idx.memberId_phien_F, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.sicbo_ones_bk     , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
    $Indexes(dbs.minigame_arc.sicbo_results_bk  , [          idx.roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}
