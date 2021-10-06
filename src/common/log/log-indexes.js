deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
    TTL                             : $Index({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8}),
    requestTimeStamp                : $Index({'requestTimeStamp': 1}),
    obCustId_gameRoundId_gameTypeId : $Index({'call.obCustId': 1, 'call.gameRoundId': 1, 'call.gameTypeId': 1}),
    gameTypeId_gameRoundId_obCustId : $Index({'call.gameTypeId': 1, 'call.gameRoundId': 1, 'call.obCustId': 1}),
    obTransId                       : $Index({'result.obTransId': 1}),
    betlogs                         : $Index({'__archive.betlogs': 1, _id: 1}),
  };

  global.___idxs = [
    $Indexes(dbs.log.bets, [
      ___idx.TTL,
      ___idx.requestTimeStamp,
      ___idx.obCustId_gameRoundId_gameTypeId,
      ___idx.gameTypeId_gameRoundId_obCustId,
      ___idx.obTransId,
      ___idx.betlogs,
    ]),
    $Indexes(dbs.log.end_games, [
      ___idx.TTL,
      ___idx.requestTimeStamp,
      ___idx.obCustId_gameRoundId_gameTypeId,
      ___idx.gameTypeId_gameRoundId_obCustId,
    ]),
    $Indexes(dbs.log.failed_requests, [
      ___idx.TTL,
      ___idx.requestTimeStamp,
      ___idx.obCustId_gameRoundId_gameTypeId,
      ___idx.gameTypeId_gameRoundId_obCustId,
    ]),
  ];
}
