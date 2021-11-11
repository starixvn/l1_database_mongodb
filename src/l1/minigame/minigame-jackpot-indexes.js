/** L1 L2 -- */
deploy: {
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const idx = {
    gameId_pool_createdAt : $Index({'gameId': 1, 'pool': 1, 'createdAt': 1}, {unique: true}),
  };
  const idxs = [
    $Indexes(dbs.minigame.jackpots , [idx.gameId_pool_createdAt]),
  ];
  idxs.forEach(_ => _.deploy());
}
