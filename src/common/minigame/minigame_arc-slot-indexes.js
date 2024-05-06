deploy: {
  const dbs   = DBs(db);
  const label = `minigame_arc-slot@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;
  if (![1, 2].includes(L)) break deploy;
  if (!["archive", "mixed"].includes(stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    expiryTime    : $Index({'expiryTime': 1}),
    id            : $Index({'id': 1}),
    memberId_id_F : $Index({'playerId': 1, 'id': 1}, {partialFilterExpression: {memberId: {$gt: 0}}}),
    playerId      : $Index({'playerId': 1}),
    playerId_id_F : $Index({'playerId': 1, 'id': 1}, {partialFilterExpression: {playerId: {$gt: 0}}}),
    time          : $Index({'time': 1}),
    uid_id        : $Index({'uid': 1, 'id': 1}),
    uid_roundId   : $Index({'uid': 1, 'roundId': 1}),
  };
}
