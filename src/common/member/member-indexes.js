deploy: {
  const dbs   = DBs(db);
  const label = `member@${dbs.toString()}`;
  if (![1, 2].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  (global.___colls = global.___colls ?? {})[label] = [
    $Collection(dbs.member.member_auths, {storageEngine}),
  ];

  (global.___idx = global.___idx ?? {})[label] = {
    TTL         : $Index({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8}),
    memberId_iP : $Index({'memberId': 1, 'iP': 1}),
    token       : $Index({'token': 1}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.member.member_auths, [
      global.___idx[label].TTL,
      global.___idx[label].memberId_iP,
      global.___idx[label].token,
    ]),
  ];
}
