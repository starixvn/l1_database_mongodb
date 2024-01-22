/** L1 L2 L3 */
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
    cuocs: {
      [1]: ($_ = [idx.roundId__id, idx.playerId_roundId_F, idx.uid_paid__id]),
      [2]: $_,
      [3]: [idx.phien__id, idx.memberId_phien_F, idx.uid_thanhtoan__id],
    }[L],
  };
  const idxs = [
    $Indexes(dbs.minigame.chineseblackjack_rounds, [idx.TTL, idx.time, idx.id, idx.ended]),
    $Indexes(dbs.minigame.chineseblackjack_bets, [idx.TTL, idx.time_archive, idx.id, idx.currency, idx.__archive_summarized, idx.__archive_do_summary, idx.endTime, ...BL.cuocs]),
  ];
  idxs.forEach((_) => _.deploy());
}

deploy: {
  const dbs = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = { wiredTiger: { configString: "block_compressor=zstd" } };
  [$Collection(dbs.minigame_arc.chineseblackjack_rounds_bk, { storageEngine }), $Collection(dbs.minigame_arc.chineseblackjack_bets_bk, { storageEngine })].forEach((_) => {
    _.create();
    _.validate();
  });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.chineseblackjack_rounds_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.chineseblackjack_bets_bk, [idx.time, idx.id, idx.phien, idx.memberId_phien_F, idx.uid_phien]),
  ];
  idxs.forEach((_) => _.deploy());
}
