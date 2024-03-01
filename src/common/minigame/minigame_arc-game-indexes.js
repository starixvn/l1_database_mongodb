deploy: {
  const dbs   = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;
  if (![1, 2].includes(L)) break deploy;
  if (!["archive", "mixed"].includes(stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    endTime             : $Index({'endTime': 1}),
    id                  : $Index({'id': 1}),
    memberId_phien_F    : $Index({'playerId': 1, 'roundId': 1}),
    playerId_roundId_F  : $Index({'playerId': 1, 'roundId': 1}),
    phien               : $Index({'roundId': 1}),
    roundId             : $Index({'roundId': 1}),
    time                : $Index({'time': 1}),
    uid_phien           : $Index({'uid': 1, 'roundId': 1}),
    uid_phien_freeBet_U : $Index({'uid': 1, 'roundId': 1, 'freeBet': 1}),
    uid_phien_U         : $Index({'uid': 1, 'roundId': 1}),
    uid_roundId         : $Index({'uid': 1, 'roundId': 1}),
    uid_roundId_U       : $Index({'uid': 1, 'roundId': 1}),
  };
}
