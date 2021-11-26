/** L1 -- L3 */
deploy: {
  const label = `minigame-game`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
    BL_phien  : $Index({phien: 1}, {partialFilterExpression: {_id: {$lt: 0}}}),
  };
  const BL = {
    cuocs : {
      [1]: [], [2]: [],
      [3]: [idx.BL_phien],
    }[dbs._mongo._identity.L],
  };
  const idxs = [
    $Indexes(dbs.minigame.xocxoc_phiens   , [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.xocxoc_cuocs    , [idx.TTL, idx.time, idx.phien__id, idx.uid_phien, idx.uid_thanhtoan__id, idx.currency, idx.isCash, ...BL.cuocs]),
    $Indexes(dbs.minigame.xocxoc_tmpcuocs , [idx.timeTTL,       idx.phien__id]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const label = `minigame_arc-game`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.xocxoc_phiens_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.xocxoc_cuocs_bk , [idx.time, idx.phien, idx.uid_phien_U]),
  ];
  idxs.forEach(_ => _.deploy());
}
