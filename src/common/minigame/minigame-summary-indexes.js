deploy: {
  const dbs = DBs(db);
  const label = `minigame-statement@${dbs.toString()}`;
  if (![1, 2, 4].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    gameId_round_operator_player_U: $Index({ gameId: 1, roundId: 1, operatorId: 1, playerId: 1 }, { unique: true }),
    time: $Index({ time: 1 }),
    roundTime: $Index({ roundTime: 1 }),
    __archive_summarized: $Index({ "__archive.summarized": 1 }),
    __archive_do_summary: $Index({ "__archive.do_summary": 1 }, { partialFilterExpression: { "__archive.do_summary": true } }),
    __archive_daily: $Index({ "__archive.daily": 1, "__archive.inserted": 1 }),
    __archive_do_daily: $Index({ "__archive.do_daily": 1 }, { partialFilterExpression: { "__archive.do_daily": true } }),
    __archive_hourly: $Index({ "__archive.hourly": 1, "__archive.inserted": 1 }),
    __archive_do_hourly: $Index({ "__archive.do_hourly": 1 }, { partialFilterExpression: { "__archive.do_hourly": true } }),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.minigame.ticket_silos, [
      global.___idx[label].TTL_arc,
      global.___idx[label].gameId_round_operator_player_U,
      global.___idx[label].time,
      global.___idx[label].roundTime,
      global.___idx[label].__archive_summarized,
      global.___idx[label].__archive_do_summary,
      global.___idx[label].__archive_daily,
      global.___idx[label].__archive_do_daily,
      global.___idx[label].__archive_hourly,
      global.___idx[label].__archive_do_hourly,
    ]),
  ];
}
