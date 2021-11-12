deploy: {
  const label = `minigame_arc-slot`;
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    uid_roundId : $Index({'uid': 1, 'roundId': 1}, {unique: true}),
    id          : $Index({'id': 1}, {unique: true}),
    uid_id      : $Index({'uid': 1, 'id': 1}),
    time        : $Index({'time': 1}),
    expiryTime  : $Index({'expiryTime': 1}),
  };
}
