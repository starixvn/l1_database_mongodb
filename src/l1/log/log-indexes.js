/** L1 -- -- */
deploy: {
  const dbs   = DBs(db);
  const label = `log@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if ((!global.___colls?.[label]) || (!global.___idx?.[label]) || (!global.___idxs?.[label])) loadScript(`../../common/log/log-indexes.js`);
  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  const colls = [
    ...global.___colls[label],
    $Collection(dbs.log.retrieve_requests     , {storageEngine}),
    $Collection(dbs.log.signin_requests       , {storageEngine}),
    $Collection(dbs.log.ticket_detail_requests, {storageEngine}),
    $Collection(dbs.log.void_games            , {storageEngine}),
  ];
  colls.forEach(_ => { _.create(); _.validate(); });
  const idx = {
    ...global.___idx[label],
    memberId: $Index({'request.memberId': 1}),
  };
  const idxs = [
    ...global.___idxs[label],
    $Indexes(dbs.log.retrieve_requests, [
      idx.TTL,
      idx.requestTimeStamp,
      idx.obCustId_gameRoundId_gameTypeId,
      idx.gameTypeId_gameRoundId_obCustId,
    ]),
    $Indexes(dbs.log.signin_requests, [
      idx.TTL,
      idx.requestTimeStamp,
      idx.memberId,
    ]),
    $Indexes(dbs.log.ticket_detail_requests, [
      idx.TTL,
      idx.requestTimeStamp,
    ]),
    $Indexes(dbs.log.void_games, [
      idx.TTL,
      idx.requestTimeStamp,
      idx.obCustId_gameRoundId_gameTypeId,
      idx.gameTypeId_gameRoundId_obCustId,
    ]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs   = DBs(db);
  const label = `log_arc@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if ((!global.___colls?.[label]) || (!global.___idx?.[label]) || (!global.___idxs?.[label])) loadScript(`../../common/log/log_arc-indexes.js`);
  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  const colls = [
    ...global.___colls[label],
    $Collection(dbs.log_arc.retrieve_requests_bk     , {storageEngine}),
    $Collection(dbs.log_arc.signin_requests_bk       , {storageEngine}),
    $Collection(dbs.log_arc.ticket_detail_requests_bk, {storageEngine}),
    $Collection(dbs.log_arc.void_games_bk            , {storageEngine}),
  ];
  colls.forEach(_ => { _.create(); _.validate(); });
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    ...global.___idxs[label],
    $Indexes(dbs.log_arc.retrieve_requests_bk, [
      idx.requestTimeStamp,
    ]),
    $Indexes(dbs.log_arc.signin_requests_bk, [
      idx.requestTimeStamp,
    ]),
    $Indexes(dbs.log_arc.ticket_detail_requests_bk, [
      idx.requestTimeStamp,
    ]),
    $Indexes(dbs.log_arc.void_games_bk, [
      idx.requestTimeStamp,
    ]),
  ];
  idxs.forEach(_ => _.deploy());
}
