deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
    timerequest : $Index({'time.request': 1}),
  };

  global.___idxs = [
    $Indexes(dbs.Proteus.betlogs, [
      ___idx.timerequest,
    ]),
  ];
}
