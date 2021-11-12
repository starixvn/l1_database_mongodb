deploy: {
  const label = `minigame-exchanges`;
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___colls = global.___colls ?? {})[label] = [
    $Collection(dbs.minigame.exchange_rates, {
      capped: true,
      size  : 1024**4,
    }),
  ];

  (global.___idx = global.___idx ?? {})[label] = {
    TTL     : $Index({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8}),
    exId_U  : $Index({'exId': 1}, {unique: true}),
    time    : $Index({'time': 1}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.minigame.exchange_rates, [
      global.___idx[label].TTL,
      global.___idx[label].exId_U,
      global.___idx[label].time,
    ]),
  ];
}
