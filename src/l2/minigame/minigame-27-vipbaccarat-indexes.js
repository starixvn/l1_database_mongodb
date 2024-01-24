/** L1 L2 -- */
deploy: {
  const dbs = DBs(db);
  const label = `minigame-game@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;
  if (path.basename(path.resolve(`..`)) != `l${L}`) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const BL = {
    cuocs: [idx.roundId__id, idx.playerId_roundId_F, idx.uid_roundId, idx.uid_paid__id],
    tmpcuocs: [idx.roundId__id, idx.uid_roundId],
  };
  const idxs = [
    $Indexes(dbs.minigame.vipbaccarat_phiens, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.vipbaccarat_cuocs, [idx.TTL, idx.time_archive, idx.currency, idx.__archive_summarized, idx.__archive_do_summary, ...BL.cuocs]),
    $Indexes(dbs.minigame.vipbaccarat_tmpcuocs, [idx.timeTTL, ...BL.tmpcuocs]),
    $Indexes(dbs.minigame.vipbaccarat_results, [idx.TTL, idx.time_archive, idx.roundId]),
  ];
  idxs.forEach((_) => _.deploy());
}

deploy: {
  const dbs = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = { wiredTiger: { configString: "block_compressor=zstd" } };
  [
    $Collection(dbs.minigame_arc.vipbaccarat_phiens_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.vipbaccarat_cuocs_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.vipbaccarat_results_bk, { storageEngine }),
  ].forEach((_) => {
    _.create();
    _.validate();
  });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.vipbaccarat_phiens_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.vipbaccarat_cuocs_bk, [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
    $Indexes(dbs.minigame_arc.vipbaccarat_results_bk, [idx.roundId]),
  ];
  idxs.forEach((_) => _.deploy());
}
