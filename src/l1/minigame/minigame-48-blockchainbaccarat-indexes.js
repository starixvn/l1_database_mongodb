/** L1 -- -- */
deploy: {
  const dbs   = DBs(db);
  const label = `minigame-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame.blockchainbaccarat_rounds   , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.blockchainbaccarat_bets     , [idx.TTL, idx.time, idx.phien__id, idx.memberId_phien_F, idx.uid_phien, idx.uid_thanhtoan__id, idx.currency, idx.isCash]),
    $Indexes(dbs.minigame.blockchainbaccarat_tmpbets  , [idx.timeTTL,       idx.phien__id, idx.uid_phien]),
    $Indexes(dbs.minigame.blockchainbaccarat_results  , [idx.TTL,           idx.roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs   = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  [ $Collection(dbs.minigame_arc.blockchainbaccarat_rounds_bk , {storageEngine}),
    $Collection(dbs.minigame_arc.blockchainbaccarat_bets_bk   , {storageEngine}),
    $Collection(dbs.minigame_arc.blockchainbaccarat_results_bk, {storageEngine}),
  ].forEach(_ => { _.create(); _.validate(); });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.blockchainbaccarat_rounds_bk  , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.blockchainbaccarat_bets_bk    , [idx.TTL, idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
    $Indexes(dbs.minigame_arc.blockchainbaccarat_results_bk , [         idx.roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}
