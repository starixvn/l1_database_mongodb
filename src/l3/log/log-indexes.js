/** -- -- L3 */
deploy: {
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  loadScript(`../../common/log/log-indexes.js`);
  const idx = {
    ...___idx,
    memberId: $Index({'memberAuth.memberId': 1}),
  };
  const idxs = [
    ...___idxs,
    $Indexes(dbs.log.enter_portals, [
      idx.TTL,
      idx.requestTimeStamp,
    ]),
    $Indexes(dbs.log.signins, [
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
    $Indexes(dbs.log_arc.enter_portals_bk, [
      idx.requestTimeStamp,
    ]),
    $Indexes(dbs.log_arc.signins_bk, [
      idx.requestTimeStamp,
    ]),
  ];
  idxs.forEach(_ => _.deploy());
}
