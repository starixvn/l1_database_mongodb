deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
    ts_TTL  : $Index({'ts': 1}, {expireAfterSeconds: 3600*24*8}),
  };

  global.___idxs = [
    $Indexes(dbs.Proteus.betlogs, [
      ___idx.ts_TTL,
    ]),
  ];
}

deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
    ...global.___idx ?? {},
    ts  : $Index({'ts': 1}),
  };

  global.___idxs = [
    ...global.___idxs ?? [],
    $Indexes(dbs.Proteus.betlogs_bk, [
      ___idx.ts,
    ]),
  ];
}
