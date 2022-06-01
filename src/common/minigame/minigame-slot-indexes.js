deploy: {
  const dbs   = DBs(db);
  const label = `minigame-slot@${dbs.toString()}`;
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    TTL           : $Index({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8}),
    currency      : $Index({'__archive.currency': 1, 'currency': 1, 'memberId': 1, 'uid': 1}),
    expiryTime    : $Index({'expiryTime': 1}),
    id            : $Index({'id': 1}, {unique: true}),
    isCash        : $Index({'__archive.isCash': 1, 'isCash': 1, 'memberId': 1, 'uid': 1}),
    memberId_id_F : $Index({'memberId': 1, 'id': 1}, {partialFilterExpression: {memberId: {$gt: 0}}}),
    paid_uid      : $Index({'paid': 1, 'uid': 1}),
    playerId_id_F : $Index({'playerId': 1, 'id': 1}, {partialFilterExpression: {playerId: {$gt: 0}}}),
    phien__id     : $Index({'phien': 1, '_id': 1}),
    time          : $Index({'time': 1}),
    uid_end       : $Index({'uid': 1, 'end': 1}, {unique: true}),
    uid_roundId   : $Index({'uid': 1, 'roundId': 1}, {unique: true}),
  };
}
