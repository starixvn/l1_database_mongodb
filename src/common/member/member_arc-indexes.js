deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
    memberId_iP : $Index({'memberId': 1, 'iP': 1}),
  };

  global.___idxs = [
    $Indexes(dbs.member_arc.member_auths_bk, [
      ___idx.memberId_iP,
    ]),
  ];
}
