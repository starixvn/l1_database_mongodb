deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___colls = [
    $Collection(dbs.minigame.exchange_rates, {
      capped: true,
      size  : 1024**4,
    }),
  ];

  global.___idx = {
    TTL     : $Index({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8}),
    exId_U  : $Index({'exId': 1}, {unique: true}),
    time    : $Index({'time': 1}),
  };

  global.___idxs = [
    $Indexes(dbs.minigame.exchange_rates, [
      ___idx.TTL,
      ___idx.exId_U,
      ___idx.time,
    ]),
  ];
}
