deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
    TTL         : $Index({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8}),
    memberId_iP : $Index({'memberId': 1, 'iP': 1}),
    token       : $Index({'token': 1}),
  };

  global.___idxs = [
    $Indexes(dbs.member.member_auths, [
      ___idx.TTL,
      ___idx.memberId_iP,
      ___idx.token,
    ]),
  ];
}
