deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
    username  : $Index({'username': 1}, {unique: true, collation: {locale: 'en', strength: 2}}),
  };

  global.___idxs = [
    $Indexes(dbs.minigame.admins, [
      ___idx.username,
    ]),
    $Indexes(dbs.minigame.admin_users, [
      ___idx.username,
    ]),
  ];
}
