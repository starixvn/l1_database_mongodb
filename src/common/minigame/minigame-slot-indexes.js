deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
    TTL                   : $Index({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8}),
    uid_roundId           : $Index({'uid': 1, 'roundId': 1}, {unique: true}),
    paid_uid              : $Index({'paid': 1, 'uid': 1}),
    time                  : $Index({'time': 1}),
    expiryTime            : $Index({'expiryTime': 1}),
    id                    : $Index({'id': 1}, {unique: true}),
    phien__id             : $Index({'phien': 1, '_id': 1}),
    currency              : $Index({'__archive.currency': 1, 'memberId': 1, 'uid': 1}),
    isCash                : $Index({'__archive.isCash': 1, 'memberId': 1, 'uid': 1}),
  };

  global.___idxs = [];
}
