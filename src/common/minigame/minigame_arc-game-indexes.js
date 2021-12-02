deploy: {
  const label = `minigame_arc-game`;
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    id                  : $Index({'id': 1}, {unique: true}),
    memberId_phien_F    : $Index({'memberId': 1, 'phien': 1}, {partialFilterExpression: {memberId: {$gt: 0}}}),
    phien               : $Index({'phien': 1}),
    time                : $Index({'time': 1}),
    uid_phien           : $Index({'uid': 1, 'phien': 1}),
    uid_phien_freeBet_U : $Index({'uid': 1, 'phien': 1, 'freeBet': 1}, {unique: true}),
    uid_phien_U         : $Index({'uid': 1, 'phien': 1}, {unique: true}),
  };
}
