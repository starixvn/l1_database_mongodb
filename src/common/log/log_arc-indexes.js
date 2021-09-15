deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
    requestTimeStamp  : $Index({'requestTimeStamp': 1}),
    summarized        : $Index({'__archive.summarized': 1, _id: 1}),
  };

  global.___idxs = [
    $Indexes(dbs.log_arc.bets_bk, [
      ___idx.requestTimeStamp,
      ___idx.summarized,
    ]),
    $Indexes(dbs.log_arc.end_games_bk, [
      ___idx.requestTimeStamp,
      ___idx.summarized,
    ]),
    $Indexes(dbs.log_arc.failed_requests_bk, [
      ___idx.requestTimeStamp,
      ___idx.summarized,
    ]),
  ];
}
