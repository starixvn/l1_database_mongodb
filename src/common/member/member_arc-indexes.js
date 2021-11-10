deploy: {
  const label = `member_arc`;
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    memberId_iP : $Index({'memberId': 1, 'iP': 1}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.member_arc.member_auths_bk, [
      global.___idx[label].memberId_iP,
    ]),
  ];
}
