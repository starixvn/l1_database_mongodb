deploy: {
  const label = `summary`;
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    TTL                         : $Index({'time': 1}, {expireAfterSeconds: 3600*24*8}),
    time_currency_gameId_system : $Index({'time': 1, 'currency': 1, 'gameId': 1, 'system': 1}, {unique: true}),
    time_currency_gameId_cash   : $Index({'time': 1, 'currency': 1, 'gameId': 1, 'isCash': 1}, {unique: true}),
    gameId_system_time          : $Index({'gameId': 1, 'system': 1, 'time': 1}),
    gameId                      : $Index({'gameId': 1}, {unique: true}),
    owGameTypeId                : $Index({'owGameTypeId': 1}, {unique: true, partialFilterExpression: {owGameTypeId: {$gt: 0}}}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.summary.betlog_summaries, [
      global.___idx[label].TTL,
      global.___idx[label].time_currency_gameId_system,
      global.___idx[label].gameId_system_time,
    ]),
    $Indexes(dbs.summary.daily_summaries, [
      global.___idx[label].TTL,
      global.___idx[label].time_currency_gameId_cash,
    ]),
    $Indexes(dbs.summary.hourly_summaries, [
      global.___idx[label].TTL,
      global.___idx[label].time_currency_gameId_cash,
    ]),
    $Indexes(dbs.summary.game_summary_config, [
      global.___idx[label].gameId,
      global.___idx[label].owGameTypeId,
    ]),
  ];
}
