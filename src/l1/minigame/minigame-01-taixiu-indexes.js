/** L1 L2 L3 */
deploy: {
  const dbs   = DBs(db);
  const label = `minigame-game@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;
  if (path.basename(path.resolve(`..`)) != `l${L}`) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
    BL_phien                : $Index({phien: 1}, {partialFilterExpression: {_id: {$lt: 0}}}),
    BL_phien_taixiu_red     : $Index({phien: 1, taixiu: 1, red: 1}, {partialFilterExpression: {_id: {$lt: 0}}}),
    BL_uid                  : $Index({uid: 1}, {partialFilterExpression: {_id: {$lt: 0}}}),
    BL_uid_phien_taixiu_red : $Index({uid: 1, phien: 1, taixiu: 1, red: 1}, {partialFilterExpression: {_id: {$lt: 0}}}),
    BL_uid_thanhtoan        : $Index({uid: 1, thanhtoan: 1}, {partialFilterExpression: {_id: {$lt: 0}}}),
  };
  const BL = {
    cuocs : {
      [1]: ($_ = [idx.roundId__id, idx.playerId_roundId_F, idx.uid_paid__id]), [2]: $_,
      [3]: [idx.phien__id, idx.memberId_phien_F, idx.uid_thanhtoan__id, idx.BL_phien, idx.BL_uid_thanhtoan, idx.BL_phien_taixiu_red],
    }[L],
    ones  : {
      [1]: ($_ = [idx.roundId__id, idx.playerId_roundId_F, idx.uid_roundId]), [2]: $_,
      [3]: [idx.phien__id, idx.memberId_phien_F, idx.uid_phien, idx.BL_uid, idx.BL_phien, idx.BL_uid_phien_taixiu_red],
    }[L],
  };
  const idxs = [
    $Indexes(dbs.minigame.taixiu_phiens , [idx.TTL, idx.time, idx.id, idx.summarized_id]),
    $Indexes(dbs.minigame.taixiu_cuocs  , [idx.TTL,           idx.archive_time, ...BL.cuocs]),
    $Indexes(dbs.minigame.taixiu_ones   , [idx.TTL, idx.time, idx.archive_time, idx.currency, idx.isCash, ...BL.ones]),
    $Indexes(dbs.minigame.taixiu_results, [idx.TTL,           idx.archive_time, idx.roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs   = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  [ $Collection(dbs.minigame_arc.taixiu_phiens_bk , {storageEngine}),
    $Collection(dbs.minigame_arc.taixiu_cuocs_bk  , {storageEngine}),
    $Collection(dbs.minigame_arc.taixiu_ones_bk   , {storageEngine}),
    $Collection(dbs.minigame_arc.taixiu_results_bk, {storageEngine}),
  ].forEach(_ => { _.create(); _.validate(); });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.taixiu_phiens_bk  , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.taixiu_cuocs_bk   , [          idx.phien, idx.memberId_phien_F, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.taixiu_ones_bk    , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
    $Indexes(dbs.minigame_arc.taixiu_results_bk , [          idx.roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}
