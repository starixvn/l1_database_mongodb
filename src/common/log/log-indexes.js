deploy: {
  const dbs   = DBs(db);
  const label = `log@${dbs.toString()}`;
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  (global.___colls = global.___colls ?? {})[label] = [
    $Collection(dbs.log.bets            , {storageEngine}),
    $Collection(dbs.log.end_games       , {storageEngine}),
    $Collection(dbs.log.failed_requests , {storageEngine}),
  ];

  (global.___idx = global.___idx ?? {})[label] = {
    TTL                             : $Index({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8}),
    requestTimeStamp                : $Index({'requestTimeStamp': 1}),
    obCustId_gameRoundId_gameTypeId : $Index({'call.obCustId': 1, 'call.gameRoundId': 1, 'call.gameTypeId': 1}),
    gameTypeId_gameRoundId_obCustId : $Index({'call.gameTypeId': 1, 'call.gameRoundId': 1, 'call.obCustId': 1}),
    obTransId                       : $Index({'result.obTransId': 1}),
    betlogs                         : $Index({'__archive.betlogs': 1, _id: 1}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.log.bets, [
      global.___idx[label].TTL,
      global.___idx[label].requestTimeStamp,
      global.___idx[label].obCustId_gameRoundId_gameTypeId,
      global.___idx[label].gameTypeId_gameRoundId_obCustId,
      global.___idx[label].obTransId,
      global.___idx[label].betlogs,
    ]),
    $Indexes(dbs.log.end_games, [
      global.___idx[label].TTL,
      global.___idx[label].requestTimeStamp,
      global.___idx[label].obCustId_gameRoundId_gameTypeId,
      global.___idx[label].gameTypeId_gameRoundId_obCustId,
    ]),
    $Indexes(dbs.log.failed_requests, [
      global.___idx[label].TTL,
      global.___idx[label].requestTimeStamp,
      global.___idx[label].obCustId_gameRoundId_gameTypeId,
      global.___idx[label].gameTypeId_gameRoundId_obCustId,
    ]),
  ];
}
