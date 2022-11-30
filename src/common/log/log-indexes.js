deploy: {
  const dbs   = DBs(db);
  const label = `log@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;
  if (![1, 2, 3].includes(L)) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  (global.___colls = global.___colls ?? {})[label] = [
    $Collection(dbs.log.bets            , {storageEngine}),
    $Collection(dbs.log.end_games       , {storageEngine}),
    $Collection(dbs.log.failed_requests , {storageEngine}),
  ];

  (global.___idx = global.___idx ?? {})[label] = {
    TTL                                    : $Index({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8}),
    requestTimeStamp                       : $Index({'requestTimeStamp': 1}),
    siteId_requestTimeStamp                : $Index({'request.siteId': 1, 'requestTimeStamp': 1}),
    logTimeStamp                           : $Index({'logTimeStamp': 1}),
    obCustId_gameRoundId_gameTypeId        : $Index({'call.obCustId': 1, 'call.gameRoundId': 1, 'call.gameTypeId': 1}),
    playerId_gameRoundId_gameTypeId        : $Index({'call.playerId': 1, 'call.gameRoundId': 1, 'call.gameTypeId': 1}),
    gameTypeId_gameRoundId_obCustId        : $Index({'call.gameTypeId': 1, 'call.gameRoundId': 1, 'call.obCustId': 1}),
    gameTypeId_gameRoundId_playerId        : $Index({'call.gameTypeId': 1, 'call.gameRoundId': 1, 'call.playerId': 1}),
    gameTypeId_gameRoundId_playerId_system : $Index({'call.gameTypeId': 1, 'call.gameRoundId': 1, 'call.playerId': 1, system: 1}),
    obTransId                              : $Index({'result.obTransId': 1}),
    betlogs                                : $Index({'__archive.betlogs': 1, _id: 1}),
  };

  const playerId = {
    [1]: ($_ = 'playerId'), [2]: $_,
    [3]: 'obCustId',
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.log.bets, [
      global.___idx[label].TTL,
      global.___idx[label].requestTimeStamp,
      global.___idx[label].logTimeStamp,
      global.___idx[label][`${playerId}_gameRoundId_gameTypeId`],
      global.___idx[label][`gameTypeId_gameRoundId_${playerId}_system`],
      global.___idx[label].obTransId,
      global.___idx[label].betlogs,
    ]),
    $Indexes(dbs.log.end_games, [
      global.___idx[label].TTL,
      global.___idx[label].requestTimeStamp,
      global.___idx[label].logTimeStamp,
      global.___idx[label][`${playerId}_gameRoundId_gameTypeId`],
      global.___idx[label][`gameTypeId_gameRoundId_${playerId}`],
    ]),
    $Indexes(dbs.log.failed_requests, [
      global.___idx[label].TTL,
      global.___idx[label].requestTimeStamp,
      global.___idx[label].logTimeStamp,
      global.___idx[label][`${playerId}_gameRoundId_gameTypeId`],
      global.___idx[label][`gameTypeId_gameRoundId_${playerId}`],
    ]),
  ];
}
