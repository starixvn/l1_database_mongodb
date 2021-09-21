deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
    type  : $Index({'type': 1}, {unique: true}),
    name  : $Index({'name': 1}, {unique: true, collation: {locale: 'en', strength: 2}}),
  };

  global.___idxs = [
    $Indexes(dbs.minigame.global_configs, [
      ___idx.type,
    ]),
    $Indexes(dbs.minigame.archive_statuses, [
      ___idx.name,
    ]),
  ];
}
