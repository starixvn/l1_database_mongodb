deploy: {
  const dbs   = DBs(db);
  const label = `member_arc@${dbs.toString()}`;
  if (![1, 2].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  (global.___colls = global.___colls ?? {})[label] = [
    $Collection(dbs.member_arc.member_auths_bk, {storageEngine}),
  ];

  (global.___idx = global.___idx ?? {})[label] = {
    memberId_iP : $Index({'memberId': 1, 'iP': 1}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.member_arc.member_auths_bk, [
      global.___idx[label].memberId_iP,
    ]),
  ];
}
