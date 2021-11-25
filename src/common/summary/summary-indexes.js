deploy: {
  const label = `summary`;
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    TTL                                   : $Index({'time': 1}, {expireAfterSeconds: 3600*24*8}),
    time_currency_gameId_cash_partner_U   : $Index({'time': 1, 'currency': 1, 'gameId': 1, 'isCash': 1, 'partnerId': 1}, {unique: true}),
    time_currency_gameId_system_partner_U : $Index({'time': 1, 'currency': 1, 'gameId': 1, 'system': 1, 'partnerId': 1}, {unique: true}),
    gameId_system_time                    : $Index({'gameId': 1, 'system': 1, 'time': 1}),
    gameId_U                              : $Index({'gameId': 1}, {unique: true}),
    owGameTypeId_FU                       : $Index({'owGameTypeId': 1}, {unique: true, partialFilterExpression: {owGameTypeId: {$gt: 0}}}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.summary.betlog_summaries, [
      global.___idx[label].TTL,
      global.___idx[label].time_currency_gameId_system_partner_U,
      global.___idx[label].gameId_system_time,
    ]),
    $Indexes(dbs.summary.daily_summaries, [
      global.___idx[label].TTL,
      global.___idx[label].time_currency_gameId_cash_partner_U,
    ]),
    $Indexes(dbs.summary.hourly_summaries, [
      global.___idx[label].TTL,
      global.___idx[label].time_currency_gameId_cash_partner_U,
    ]),
    $Indexes(dbs.summary.game_summary_config, [
      global.___idx[label].gameId_U,
      global.___idx[label].owGameTypeId_FU,
    ]),
  ];
}
