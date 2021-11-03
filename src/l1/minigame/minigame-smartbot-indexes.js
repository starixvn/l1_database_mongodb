/** L1 L2 -- */
deploy: {
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  // loadScript(`../../common/minigame/minigame-smartbot-indexes.js`);
  const idx = {
    // ...___idx,
    time_group : $Index({'time': 1, 'group': 1}),
    patId_time : $Index({'patId': 1, 'time': 1}),
  };
  const idxs = [
    // ...___idxs,
    $Indexes(dbs.minigame.smartbot_xocxoc_patterns  , [idx.time_group]),
    $Indexes(dbs.minigame.smartbot_xocxoc_bets      , [idx.patId_time]),

    $Indexes(dbs.minigame.smartbot_vipsedie_patterns, [idx.time_group]),
    $Indexes(dbs.minigame.smartbot_vipsedie_bets    , [idx.patId_time]),

    $Indexes(dbs.minigame.smartbot_taixiu_patterns  , [idx.time_group]),
    $Indexes(dbs.minigame.smartbot_taixiu_bets      , [idx.patId_time]),

    $Indexes(dbs.minigame.smartbot_txturbo_patterns , [idx.time_group]),
    $Indexes(dbs.minigame.smartbot_txturbo_bets     , [idx.patId_time]),
  ];
  idxs.forEach(_ => _.deploy());
}
