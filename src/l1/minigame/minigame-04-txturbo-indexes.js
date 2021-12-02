/** L1 L2 L3 */
deploy: {
  const label = `minigame-game`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
    BL_phien                : $Index({phien: 1}, {partialFilterExpression: {_id: {$lt: 0}}}),
    BL_phien_taixiu_red     : $Index({phien: 1, taixiu: 1, red: 1}, {partialFilterExpression: {_id: {$lt: 0}}}),
    BL_uid                  : $Index({uid: 1}, {partialFilterExpression: {_id: {$lt: 0}}}),
    BL_uid_phien_taixiu_red : $Index({uid: 1, phien: 1, taixiu: 1, red: 1}, {partialFilterExpression: {_id: {$lt: 0}}}),
    BL_uid_thanhtoan        : $Index({uid: 1, thanhtoan: 1}, {partialFilterExpression: {_id: {$lt: 0}}}),
  };
  const BL = {
    cuocs : {
      [1]: [], [2]: [],
      [3]: [idx.BL_phien, idx.BL_uid_thanhtoan, idx.BL_phien_taixiu_red],
    }[dbs._mongo._identity.L],
    ones  : {
      [1]: [], [2]: [],
      [3]: [idx.BL_uid, idx.BL_phien, idx.BL_uid_phien_taixiu_red],
    }[dbs._mongo._identity.L],
  };
  const idxs = [
    $Indexes(dbs.minigame.txturbo_phiens, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.txturbo_cuocs , [idx.TTL,           idx.phien__id, idx.memberId_phien_F, idx.uid_thanhtoan__id, ...BL.cuocs]),
    $Indexes(dbs.minigame.txturbo_ones  , [idx.TTL, idx.time, idx.phien__id, idx.memberId_phien_F, idx.uid_phien, idx.currency, idx.isCash, ...BL.ones]),
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
    $Indexes(dbs.minigame_arc.txturbo_phiens_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.txturbo_cuocs_bk  , [          idx.phien, idx.memberId_phien_F, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.txturbo_ones_bk   , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
  ];
  idxs.forEach(_ => _.deploy());
}
