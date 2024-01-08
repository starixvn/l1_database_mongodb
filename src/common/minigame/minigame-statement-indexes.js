deploy: {
  const dbs = DBs(db);
  const label = `minigame-statement@${dbs.toString()}`;
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    gameId_round_operator_player_U: $Index({ gameId: 1, roundId: 1, operatorId: 1, playerId: 1 }, { unique: true }),
    __archive_summarized: $Index({ "__archive.summarized": 1 }),
    __archive_do_summary: $Index({ "__archive.do_summary": 1 }, { partialFilterExpression: { "__archive.do_summary": true } }),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.minigame.ticket_silos, [global.___idx[label].TTL_arc, global.___idx[label].gameId_round_operator_player_U, ___idx[label].__archive_summarized, ___idx[label].__archive_do_summary]),
  ];
}
