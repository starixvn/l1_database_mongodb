/** -- -- L3 */
deploy: {
  const dbs   = DBs(db);
  const label = `minigame-game@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;
  if (path.basename(path.resolve(`..`)) != `l${L}`) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
    BL_phien  : $Index({phien: 1}, {partialFilterExpression: {_id: {$lt: 0}}}),
  };
  const BL = {
    cuocs: {
      [1]: ($_ = [idx.roundId__id, idx.playerId_roundId_F, idx.uid_roundId, idx.uid_paid__id]), [2]: $_, [3]: [idx.BL_phien],
    }[L],
  };
  const idxs = [
    $Indexes(dbs.minigame.baccaratdiamond_phiens    , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.baccaratdiamond_cuocs     , [idx.TTL, idx.time, idx.phien__id, idx.memberId_phien_F, idx.uid_phien, idx.uid_thanhtoan__id, idx.currency, idx.isCash, ...BL.cuocs]),
    $Indexes(dbs.minigame.baccaratdiamond_tmpcuocs  , [idx.timeTTL,       idx.phien__id, idx.uid_phien]),

    $Indexes(dbs.minigame.baccaratsapphire_phiens   , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.baccaratsapphire_cuocs    , [idx.TTL, idx.time, idx.phien__id, idx.memberId_phien_F, idx.uid_phien, idx.uid_thanhtoan__id, idx.currency, idx.isCash, ...BL.cuocs]),
    $Indexes(dbs.minigame.baccaratsapphire_tmpcuocs , [idx.timeTTL,       idx.phien__id, idx.uid_phien]),

    $Indexes(dbs.minigame.baccaratruby_phiens       , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.baccaratruby_cuocs        , [idx.TTL, idx.time, idx.phien__id, idx.memberId_phien_F, idx.uid_phien, idx.uid_thanhtoan__id, idx.currency, idx.isCash, ...BL.cuocs]),
    $Indexes(dbs.minigame.baccaratruby_tmpcuocs     , [idx.timeTTL,       idx.phien__id, idx.uid_phien]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs   = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  [ $Collection(dbs.minigame_arc.baccaratdiamond_phiens_bk  , {storageEngine}),
    $Collection(dbs.minigame_arc.baccaratdiamond_cuocs_bk   , {storageEngine}),

    $Collection(dbs.minigame_arc.baccaratsapphire_phiens_bk , {storageEngine}),
    $Collection(dbs.minigame_arc.baccaratsapphire_cuocs_bk  , {storageEngine}),

    $Collection(dbs.minigame_arc.baccaratruby_phiens_bk     , {storageEngine}),
    $Collection(dbs.minigame_arc.baccaratruby_cuocs_bk      , {storageEngine}),
  ].forEach(_ => { _.create(); _.validate(); });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.baccaratdiamond_phiens_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.baccaratdiamond_cuocs_bk  , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),

    $Indexes(dbs.minigame_arc.baccaratsapphire_phiens_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.baccaratsapphire_cuocs_bk , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),

    $Indexes(dbs.minigame_arc.baccaratruby_phiens_bk    , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.baccaratruby_cuocs_bk     , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
  ];
  idxs.forEach(_ => _.deploy());
}
