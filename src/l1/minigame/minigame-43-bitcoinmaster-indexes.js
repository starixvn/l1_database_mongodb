/** L1 -- -- */
deploy: {
  const label = `minigame-game`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame.bitcoinmaster_rounds  , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.bitcoinmaster_betlogs , [idx.TTL,           idx.phien__id, idx.uid_thanhtoan__id]),
    $Indexes(dbs.minigame.bitcoinmaster_bets    , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.currency, idx.isCash]),

    $Indexes(dbs.minigame.crypto_candlesticks   , [         idx.time]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const label = `minigame_arc-game`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.bitcoinmaster_rounds_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.bitcoinmaster_betlogs_bk, [          idx.phien, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.bitcoinmaster_bets_bk   , [idx.time, idx.phien, idx.uid_phien_U]),
  ];
  idxs.forEach(_ => _.deploy());
}
