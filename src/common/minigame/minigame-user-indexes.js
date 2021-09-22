deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
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

  global.___idxs = [
    $Indexes(dbs.minigame.users, [
      ___idx.username_U_en,
      ___idx.memberId,
      ___idx.memberName,
    ]),
    $Indexes(dbs.minigame.userinfos, [
      ___idx.id_U,
      ___idx.id_U_en,
      ___idx.UID_U,
      ___idx.name_U_en,
      ___idx.currency,
      ___idx.type_inRoom_red,
    ]),
    $Indexes(dbs.minigame.usersessions, [
      ___idx.sessionId_U,
      ___idx.ssoToken,
      ___idx.recheckInTime,
      ___idx.TTL,
    ]),
  ];
}
