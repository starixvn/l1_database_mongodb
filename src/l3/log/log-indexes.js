/** -- -- L3 */
deploy: {
  const label = `log`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if ((!global.___idx?.[label]) || (!global.___idxs?.[label])) loadScript(`../../common/log/log-indexes.js`);
  const idx = {
    ...global.___idx[label],
    memberId: $Index({'memberAuth.memberId': 1}),
  };
  const idxs = [
    ...global.___idxs[label],
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
  const label = `log_arc`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if ((!global.___idx?.[label]) || (!global.___idxs?.[label])) loadScript(`../../common/log/log_arc-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    ...global.___idxs[label],
    $Indexes(dbs.log_arc.enter_portals_bk, [
      idx.requestTimeStamp,
    ]),
    $Indexes(dbs.log_arc.signins_bk, [
      idx.requestTimeStamp,
    ]),
  ];
  idxs.forEach(_ => _.deploy());
}
