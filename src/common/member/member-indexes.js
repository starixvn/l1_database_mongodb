deploy: {
  const label = `member`;
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

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
