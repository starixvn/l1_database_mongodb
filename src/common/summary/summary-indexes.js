deploy: {
  const dbs   = DBs(db);
  const label = `summary@${dbs.toString()}`;
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    TTL                                   : $Index({'time': 1}, {expireAfterSeconds: 3600*24*8}),
    time_currency_gameId_cash_partner_U   : $Index({'time': 1, 'currency': 1, 'gameId': 1, 'isCash': 1, 'partnerId': 1}, {unique: true}),
    time_currency_gameId_system_partner_U : $Index({'time': 1, 'currency': 1, 'gameId': 1, 'system': 1, 'partnerId': 1}, {unique: true}),
    gameId_system_time                    : $Index({'gameId': 1, 'system': 1, 'time': 1}),
    gameId_U                              : $Index({'gameId': 1}, {unique: true}),
    owGameTypeId_FU                       : $Index({'owGameTypeId': 1}, {unique: true, partialFilterExpression: {owGameTypeId: {$gt: 0}}}),
    db_coll__id_U                         : $Index({'target.db': 1, 'target.coll': 1, 'data._id': 1}, {unique: true}),
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
    $Indexes(dbs.summary.metadata_configs, [
      global.___idx[label].gameId_U,
    ]),
    $Indexes(dbs.summary.summary_configs, [
      global.___idx[label].gameId_U,
    ]),
    $Indexes(dbs.summary.metadata_queue, [
      global.___idx[label].db_coll__id_U,
    ]),
  ];
}

deploy: {
  const dbs   = DBs(db);
  const label = `summary_arc@${dbs.toString()}`;
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  (global.___idx = global.___idx ?? {})[label] = {
    time_currency_gameId_cash_partner_U   : $Index({'time': 1, 'currency': 1, 'gameId': 1, 'isCash': 1, 'partnerId': 1}, {unique: true}),
    time_currency_gameId_system_partner_U : $Index({'time': 1, 'currency': 1, 'gameId': 1, 'system': 1, 'partnerId': 1}, {unique: true}),
    gameId_currency                       : $Index({'gameId': 1, 'currency': 1}),
    gameId_U                              : $Index({'gameId': 1}, {unique: true}),
    owGameTypeId_FU                       : $Index({'owGameTypeId': 1}, {unique: true, partialFilterExpression: {owGameTypeId: {$gt: 0}}}),
    gameId_patId_time                     : $Index({'gameId': 1, 'patId': 1, 'time': 1}),
    gameId_memberId_time_U                : $Index({'gameId': 1, 'memberId': 1, 'time': 1}, {unique: true}),
    gameId_time_group                     : $Index({'gameId': 1, 'time': 1, 'group': 1}),
  };

  (global.___idxs = global.___idxs ?? {})[label] = [
    $Indexes(dbs.summary_arc.betlog_summaries, [
      global.___idx[label].time_currency_gameId_system_partner_U,
      global.___idx[label].gameId_currency,
    ]),
    $Indexes(dbs.summary_arc.daily_summaries, [
      global.___idx[label].time_currency_gameId_cash_partner_U,
      global.___idx[label].gameId_currency,
    ]),
    $Indexes(dbs.summary_arc.hourly_summaries, [
      global.___idx[label].time_currency_gameId_cash_partner_U,
      global.___idx[label].gameId_currency,
    ]),
    $Indexes(dbs.summary_arc.game_summary_config, [
      global.___idx[label].gameId_U,
      global.___idx[label].owGameTypeId_FU,
    ]),
    $Indexes(dbs.summary_arc.smartbot_databank_bets, [
      global.___idx[label].gameId_patId_time,
    ]),
    $Indexes(dbs.summary_arc.smartbot_databank_patterns, [
      global.___idx[label].gameId_memberId_time_U,
      global.___idx[label].gameId_time_group,
    ]),
  ];
}
