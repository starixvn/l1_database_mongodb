/** -- -- L3 */
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
    $Indexes(dbs.minigame.baccaratdiamond_phiens    , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.baccaratdiamond_cuocs     , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.uid_thanhtoan__id, idx.currency, idx.isCash]),
    $Indexes(dbs.minigame.baccaratdiamond_tmpcuocs  , [idx.timeTTL,       idx.phien__id, idx.uid_phien]),

    $Indexes(dbs.minigame.baccaratsapphire_phiens   , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.baccaratsapphire_cuocs    , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.uid_thanhtoan__id, idx.currency, idx.isCash]),
    $Indexes(dbs.minigame.baccaratsapphire_tmpcuocs , [idx.timeTTL,       idx.phien__id, idx.uid_phien]),

    $Indexes(dbs.minigame.baccaratruby_phiens       , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.baccaratruby_cuocs        , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.uid_thanhtoan__id, idx.currency, idx.isCash]),
    $Indexes(dbs.minigame.baccaratruby_tmpcuocs     , [idx.timeTTL,       idx.phien__id, idx.uid_phien]),
  ];
  idxs.forEach(_ => _.deploy());
}
