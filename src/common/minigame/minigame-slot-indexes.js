deploy: {
  const dbs   = DBs(db);
  const label = `minigame-slot@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;
  if (![1, 2, 3].includes(L)) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    TTL           : $Index({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8}),
    currency      : $Index({'__archive.currency': 1, 'currency': 1, 'playerId': 1, 'uid': 1}),
    expiryTime    : $Index({'expiryTime': 1}),
    id            : $Index({'id': 1}, {unique: true}),
    isCash        : $Index({'__archive.isCash': 1, 'isCash': 1, 'playerId': 1, 'uid': 1}),
    memberId_id_F : $Index({'memberId': 1, 'id': 1}, {partialFilterExpression: {memberId: {$gt: 0}}}),
    paid_uid      : $Index({'paid': 1, 'uid': 1}),
    phien__id     : $Index({'phien': 1, '_id': 1}),
    playerId      : $Index({'playerId': 1}),
    playerId_id_F : $Index({'playerId': 1, 'id': 1}, {partialFilterExpression: {playerId: {$gt: 0}}}),
    roundId__id   : $Index({'roundId': 1, '_id': 1}),
    summarized_id : $Index({'__archive.summarized': 1, 'paid': 1, 'time': 1, 'id': 1}),
    __archive_summarized : $Index({'__archive.summarized': 1}),
    __archive_do_summary : $Index({'__archive.do_summary': 1 }, {partialFilterExpression: {'__archive.do_summary': true}}),
    time          : $Index({'time': 1}),
    time_archive  : $Index({'time': 1, '__archive.eventtime': 1}),
    uid_ended_F   : $Index({'uid': 1, 'ended': 1}, {unique: true, partialFilterExpression: {ended: false}}),
    uid_roundId   : $Index({'uid': 1, 'roundId': 1}, {unique: true}),
  };
}
