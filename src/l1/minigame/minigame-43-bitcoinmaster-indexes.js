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
    betlogs: {
      [1]: ($_ = [idx.roundId__id, idx.playerId_roundId_F, idx.uid_paid__id]), [2]: $_, [3]: [],
    }[L],
    bets: {
      [1]: ($_ = [idx.roundId__id, idx.playerId_roundId_F, idx.uid_roundId]), [2]: $_, [3]: [],
    }[L],
  };
  const idxs = [
    $Indexes(dbs.minigame.bitcoinmaster_rounds  , [idx.TTL, idx.time, idx.id, idx.summarized_id]),
    $Indexes(dbs.minigame.bitcoinmaster_betlogs , [idx.TTL,           idx.phien__id, idx.memberId_phien_F, idx.uid_thanhtoan__id, ...BL.betlogs]),
    $Indexes(dbs.minigame.bitcoinmaster_bets    , [idx.TTL, idx.time, idx.phien__id, idx.memberId_phien_F, idx.uid_phien, idx.currency, idx.isCash, ...BL.bets]),

    $Indexes(dbs.minigame.crypto_candlesticks   , [idx.TTL, idx.time]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs   = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  [ $Collection(dbs.minigame_arc.bitcoinmaster_rounds_bk , {storageEngine}),
    $Collection(dbs.minigame_arc.bitcoinmaster_betlogs_bk, {storageEngine}),
    $Collection(dbs.minigame_arc.bitcoinmaster_bets_bk   , {storageEngine}),
  ].forEach(_ => { _.create(); _.validate(); });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.bitcoinmaster_rounds_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.bitcoinmaster_betlogs_bk, [          idx.phien, idx.memberId_phien_F, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.bitcoinmaster_bets_bk   , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
  ];
  idxs.forEach(_ => _.deploy());
}
