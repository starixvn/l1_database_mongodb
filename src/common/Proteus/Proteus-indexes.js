deploy: {
  const label = `Proteus`;
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    ts_TTL  : $Index({'ts': 1}, {expireAfterSeconds: 3600*24*8}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.Proteus.betlogs, [
      global.___idx[label].ts_TTL,
    ]),
  ];
}

deploy: {
  const label = `Proteus_arc`;
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    ts  : $Index({'ts': 1}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.Proteus.betlogs_bk, [
      global.___idx[label].ts,
    ]),
  ];
}
