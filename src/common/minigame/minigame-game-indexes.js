deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
    TTL               : $Index({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8}),
    uid_phien         : $Index({'uid': 1, 'phien': 1}, {unique: true}),
    uid_phien_freeBet : $Index({'uid': 1, 'phien': 1, 'freeBet': 1}, {unique: true}),
    uid_thanhtoan__id : $Index({'uid': 1, 'thanhtoan': 1, '_id': 1}),
    uid__id           : $Index({'uid': 1, '_id': 1}),
    time              : $Index({'time': 1}),
    timeTTL           : $Index({'time': 1}, {expireAfterSeconds: 120}),
    id                : $Index({'id': 1}, {unique: true}),
    phien__id         : $Index({'phien': 1, '_id': 1}),
    currency          : $Index({'__archive.currency': 1, 'memberId': 1, 'uid': 1}),
    isCash            : $Index({'__archive.isCash': 1, 'memberId': 1, 'uid': 1}),
    ended             : $Index({'ended': 1}),
    endTime           : $Index({'endTime': 1}),
  };

  global.___idxs = [];
}
