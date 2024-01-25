deploy: {
  const dbs   = DBs(db);
  const label = `minigame-game_configs@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;
  if (![1, 2].includes(L)) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  (global.___colls = global.___colls ?? {})[label] = [
    $Collection(dbs.minigame.currencies, {
      collation: {locale: 'en', strength: 2},
    }),
    $Collection(dbs.minigame.currency_groups, {
      collation: {locale: 'en', strength: 2},
    }),
    $Collection(dbs.minigame.partners, {
      collation: {locale: 'en', strength: 2},
    }),
  ];

  (global.___idx = global.___idx ?? {})[label] = {
    name_U            : $Index({'name': 1}, {unique: true}),
    name_U_en         : $Index({'name': 1}, {unique: true, collation: {locale: 'en', strength: 2}}),
    partnerId_en      : $Index({'partnerId': 1}, {collation: {locale: 'en', strength: 2}}),
    partnerId_U_en    : $Index({'partnerId': 1}, {unique: true, collation: {locale: 'en', strength: 2}}),
    type_U            : $Index({'type': 1}, {unique: true}),
    name_partnerId_U  : $Index({'name': 1, 'partnerId': 1}, {unique: true, collation: {locale: 'en', strength: 2}}),
    groupId_gameId_U  : $Index({'groupId': 1, 'gameId': 1}, {unique: true}),
    value_U           : $Index({'value': 1}, {unique: true}),
    gameId_SU         : $Index({'gameId': 1}, {unique: true, sparse: true}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.minigame.archive_statuses, [
      global.___idx[label].name_U,
      global.___idx[label].name_U_en,
    ]),
    $Indexes(dbs.minigame.game_configs, [
      global.___idx[label].name_U,
      global.___idx[label].name_U_en,
      global.___idx[label].gameId_SU,
    ]),
    $Indexes(dbs.minigame.global_configs, [
      global.___idx[label].type_U,
    ]),
    $Indexes(dbs.minigame.partners, [
      global.___idx[label].partnerId_U_en,
    ]),
    $Indexes(dbs.minigame.currency_groups, [
      global.___idx[label].partnerId_en,
    ]),
    $Indexes(dbs.minigame.currencies, [
      global.___idx[label].name_partnerId_U,
    ]),
    $Indexes(dbs.minigame.currency_group_games, [
      global.___idx[label].groupId_gameId_U,
    ]),
    $Indexes(dbs.minigame.chips, [
      global.___idx[label].value_U,
    ]),
  ];
}
