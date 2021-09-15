deploy: {
  const dbs = DBs(db);
  if (![3].includes(dbs._mongo?._identity?.L)) break deploy;
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
