deploy: {
  const dbs   = DBs(db);
  const label = `Proteus@${dbs.toString()}`;
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  (global.___colls = global.___colls ?? {})[label] = [
    $Collection(dbs.Proteus.betlogs, {storageEngine}),
  ];

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
  const dbs   = DBs(db);
  const label = `Proteus_arc@${dbs.toString()}`;
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  (global.___colls = global.___colls ?? {})[label] = [
    $Collection(dbs.Proteus.betlogs_bk, {storageEngine}),
  ];

  (global.___idx = global.___idx ?? {})[label] = {
    ts  : $Index({'ts': 1}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.Proteus.betlogs_bk, [
      global.___idx[label].ts,
    ]),
  ];
}
