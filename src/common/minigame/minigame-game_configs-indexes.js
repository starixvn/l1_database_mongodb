deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___colls = [
    $Collection(dbs.minigame.partners, {
      collation: {locale: 'en', strength: 2},
    }),
    $Collection(dbs.minigame.currency_groups, {
      collation: {locale: 'en', strength: 2},
    }),
  ];

  global.___idx = {
    name_U            : $Index({'name': 1}, {unique: true}),
    name_U_en         : $Index({'name': 1}, {unique: true, collation: {locale: 'en', strength: 2}}),
    partnerId_en      : $Index({'partnerId': 1}, {collation: {locale: 'en', strength: 2}}),
    partnerId_U_en    : $Index({'partnerId': 1}, {unique: true, collation: {locale: 'en', strength: 2}}),
    type_U            : $Index({'type': 1}, {unique: true}),
    name_partnerId_U  : $Index({'name': 1, 'partnerId': 1}, {unique: true, collation: {locale: 'en', strength: 2}}),
    groupId_gameId_U  : $Index({'groupId': 1, 'gameId': 1}, {unique: true}),
    value_U           : $Index({'value': 1}, {unique: true}),
  };

  global.___idxs = [
    $Indexes(dbs.minigame.archive_statuses, [
      ___idx.name_U,
      ___idx.name_U_en,
    ]),
    $Indexes(dbs.minigame.game_configs, [
      ___idx.name_U,
      ___idx.name_U_en,
    ]),
    $Indexes(dbs.minigame.global_configs, [
      ___idx.type_U,
    ]),
    $Indexes(dbs.minigame.partners, [
      ___idx.partnerId_U_en,
    ]),
    $Indexes(dbs.minigame.currency_groups, [
      ___idx.partnerId_en,
    ]),
    $Indexes(dbs.minigame.currencies, [
      ___idx.name_partnerId_U,
    ]),
    $Indexes(dbs.minigame.currency_group_games, [
      ___idx.groupId_gameId_U,
    ]),
    $Indexes(dbs.minigame.chips, [
      ___idx.value_U,
    ]),
  ];
}
