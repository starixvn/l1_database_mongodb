deploy: {
  const dbs   = DBs(db);
  const label = `minigame-user@${dbs.toString()}`;
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___colls = global.___colls ?? {})[label] = [
    $Collection(dbs.minigame.users, {
      collation: {locale: 'en', strength: 2},
    }),
    $Collection(dbs.minigame.userinfos, {
      collation: {locale: 'en', strength: 2},
    }),
  ];

  (global.___idx = global.___idx ?? {})[label] = {
    username_U_en   : $Index({'local.username': 1}, {unique: true, collation: {locale: 'en', strength: 2}}),
    memberId        : $Index({'local.memberId': 1}),
    memberName      : $Index({'local.memberName': 1}),
    id_U            : $Index({'id': 1}, {unique: true, collation: {locale: 'simple'}}),
    id_U_en         : $Index({'id': 1}, {unique: true, collation: {locale: 'en', strength: 2}}),
    UID_U           : $Index({'UID': 1}, {unique: true}),
    name_U_en       : $Index({'name': 1}, {unique: true, collation: {locale: 'en', strength: 2}}),
    currency        : $Index({'currency': 1}, {collation: {locale: 'en', strength: 2}}),
    type_inRoom_red : $Index({'type': 1, 'inRoom': 1, 'red': 1}),
    sessionId_U     : $Index({'sessionId': 1}, {unique: true}),
    ssoToken        : $Index({'ssoToken': 1}),
    recheckInTime   : $Index({'recheckInTime': 1}),
    TTL             : $Index({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.minigame.users, [
      global.___idx[label].username_U_en,
      global.___idx[label].memberId,
      global.___idx[label].memberName,
    ]),
    $Indexes(dbs.minigame.userinfos, [
      global.___idx[label].id_U,
      global.___idx[label].id_U_en,
      global.___idx[label].UID_U,
      global.___idx[label].name_U_en,
      global.___idx[label].currency,
      global.___idx[label].type_inRoom_red,
    ]),
    $Indexes(dbs.minigame.usersessions, [
      global.___idx[label].sessionId_U,
      global.___idx[label].ssoToken,
      global.___idx[label].recheckInTime,
      global.___idx[label].TTL,
    ]),
  ];
}
