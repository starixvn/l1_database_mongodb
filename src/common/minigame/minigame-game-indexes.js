deploy: {
  const dbs   = DBs(db);
  const label = `minigame-game@${dbs.toString()}`;
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    TTL                 : $Index({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8}),
    currency            : $Index({'__archive.currency': 1, 'currency': 1, 'memberId': 1, 'uid': 1}),
    ended               : $Index({'ended': 1}),
    endTime             : $Index({'endTime': 1}),
    id                  : $Index({'id': 1}, {unique: true}),
    isCash              : $Index({'__archive.isCash': 1, 'isCash': 1, 'memberId': 1, 'uid': 1}),
    memberId_id_F       : $Index({'memberId': 1, 'id': 1}, {partialFilterExpression: {memberId: {$gt: 0}}}),
    memberId_phien_F    : $Index({'memberId': 1, 'phien': 1}, {partialFilterExpression: {memberId: {$gt: 0}}}),
    memberId_roundId_F  : $Index({'memberId': 1, 'roundId': 1}, {partialFilterExpression: {memberId: {$gt: 0}}}),
    phien__id           : $Index({'phien': 1, '_id': 1}),
    roundId             : $Index({'roundId': 1}),
    roundId_uid         : $Index({'roundId': 1, 'uid': 1}),
    time                : $Index({'time': 1}),
    timeTTL             : $Index({'time': 1}, {expireAfterSeconds: 120}),
    uid__id             : $Index({'uid': 1, '_id': 1}),
    uid_phien           : $Index({'uid': 1, 'phien': 1}, {unique: true}),
    uid_phien_freeBet   : $Index({'uid': 1, 'phien': 1, 'freeBet': 1}, {unique: true}),
    uid_thanhtoan__id   : $Index({'uid': 1, 'thanhtoan': 1, '_id': 1}),
  };
}
