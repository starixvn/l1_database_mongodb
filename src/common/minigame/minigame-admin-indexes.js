deploy: {
  const dbs   = DBs(db);
  const label = `minigame-admin@${dbs.toString()}`;
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    username  : $Index({'username': 1}, {unique: true, collation: {locale: 'en', strength: 2}}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.minigame.admins, [
      global.___idx[label].username,
    ]),
    $Indexes(dbs.minigame.admin_users, [
      global.___idx[label].username,
    ]),
  ];
}
