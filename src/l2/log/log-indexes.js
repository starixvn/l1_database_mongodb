/** -- L2 -- */
deploy: {
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  loadScript(`../../common/log/log-indexes.js`);
  const idx = {
    ...___idx,
    memberId: $Index({'request.memberId': 1}),
  };
  const idxs = [
    ...___idxs,
    $Indexes(dbs.log.hit_jackpots, [
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
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  loadScript(`../../common/log/log_arc-indexes.js`);
  const idx = {
    ...___idx,
  };
  const idxs = [
    ...___idxs,
    $Indexes(dbs.log_arc.hit_jackpots_bk, [
      idx.requestTimeStamp,
    ]),
    $Indexes(dbs.log_arc.signin_requests_bk, [
      idx.requestTimeStamp,
    ]),
  ];
  idxs.forEach(_ => _.deploy());
}
