/** L1 L2 L3 */
deploy: {
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  loadScript(`../../common/minigame/minigame-game-indexes.js`);
  const idx = {
    ...___idx,
  };
  const idxs = [
    ...___idxs,
    $Indexes(dbs.minigame.baucua_phiens , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.baucua_cuocs  , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.uid_thanhtoan__id, idx.currency, idx.isCash]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...___idx,
  };
  const idxs = [
    ...___idxs,
    $Indexes(dbs.minigame_arc.baucua_phiens_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.baucua_cuocs_bk , [idx.time, idx.phien, idx.uid_phien_U]),
  ];
  idxs.forEach(_ => _.deploy());
}
