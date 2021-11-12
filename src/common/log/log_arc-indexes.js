deploy: {
  const label = `log_arc`;
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    requestTimeStamp  : $Index({'requestTimeStamp': 1}),
    betlogs           : $Index({'__archive.betlogs': 1, _id: 1}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.log_arc.bets_bk, [
      global.___idx[label].requestTimeStamp,
      global.___idx[label].betlogs,
    ]),
    $Indexes(dbs.log_arc.end_games_bk, [
      global.___idx[label].requestTimeStamp,
    ]),
    $Indexes(dbs.log_arc.failed_requests_bk, [
      global.___idx[label].requestTimeStamp,
    ]),
  ];
}
