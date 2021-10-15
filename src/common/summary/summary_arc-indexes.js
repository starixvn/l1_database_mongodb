deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
    time_currency_gameId_cash   : $Index({'time': 1, 'currency': 1, 'gameId': 1, 'isCash': 1}, {unique: true}),
    time_currency_gameId_system : $Index({'time': 1, 'currency': 1, 'gameId': 1, 'system': 1}, {unique: true}),
    gameId_currency             : $Index({'gameId': 1, 'currency': 1}),
    gameId                      : $Index({'gameId': 1}, {unique: true}),
    owGameTypeId                : $Index({'owGameTypeId': 1}, {unique: true, partialFilterExpression: {owGameTypeId: {$gt: 0}}}),
    gameId_patId_time           : $Index({'gameId': 1, 'patId': 1, 'time': 1}),
    gameId_memberId_time        : $Index({'gameId': 1, 'memberId': 1, 'time': 1}, {unique: true}),
    gameId_time_group           : $Index({'gameId': 1, 'time': 1, 'group': 1}),
  };

  global.___idxs = [
    $Indexes(dbs.summary_arc.betlog_summaries, [
      ___idx.time_currency_gameId_system,
      ___idx.gameId_currency,
    ]),
    $Indexes(dbs.summary_arc.daily_summaries, [
      ___idx.time_currency_gameId_cash,
      ___idx.gameId_currency,
    ]),
    $Indexes(dbs.summary_arc.hourly_summaries, [
      ___idx.time_currency_gameId_cash,
      ___idx.gameId_currency,
    ]),
    $Indexes(dbs.summary_arc.game_summary_config, [
      ___idx.gameId,
      ___idx.owGameTypeId,
    ]),
    $Indexes(dbs.summary_arc.smartbot_databank_bets, [
      ___idx.gameId_patId_time,
    ]),
    $Indexes(dbs.summary_arc.smartbot_databank_patterns, [
      ___idx.gameId_memberId_time,
      ___idx.gameId_time_group,
    ]),
  ];
}
