/** L1 L2 L3 */
deploy: {
  const dbs   = DBs(db);
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
      [1]: ($_ = [idx.roundId__id, idx.playerId_roundId_F]), [2]: $_,
      [3]: [idx.phien__id, idx.memberId_phien_F],
    }[L],
    ones: {
      [1]: ($_ = [idx.roundId__id, idx.playerId_roundId_F, idx.uid_roundId]), [2]: $_,
      [3]: [idx.phien__id, idx.memberId_phien_F, idx.uid_phien],
    }[L],
  };
  const idxs = [
    $Indexes(dbs.minigame.kenomax_phiens   , [idx.TTL, idx.time, idx.id, idx.summarized_id]),
    $Indexes(dbs.minigame.kenomax_cuocs    , [idx.TTL, idx.time_archive, idx.uid__id, ...BL.cuocs]),
    $Indexes(dbs.minigame.kenomax_ones     , [idx.TTL, idx.time_archive, idx.currency, idx.isCash, ...BL.ones]),
    $Indexes(dbs.minigame.kenomax_tmpbets  , [idx.timeTTL,       idx.roundId__id, idx.uid_roundId]),
    $Indexes(dbs.minigame.kenomax_results  , [idx.TTL, idx.time_archive, idx.roundId]),

    $Indexes(dbs.minigame.kenomax2_phiens  , [idx.TTL, idx.time, idx.id, idx.summarized_id]),
    $Indexes(dbs.minigame.kenomax2_cuocs   , [idx.TTL, idx.time_archive, idx.uid__id, ...BL.cuocs]),
    $Indexes(dbs.minigame.kenomax2_ones    , [idx.TTL, idx.time_archive, idx.currency, idx.isCash, ...BL.ones]),
    $Indexes(dbs.minigame.kenomax2_tmpbets , [idx.timeTTL,       idx.roundId__id, idx.uid_roundId]),
    $Indexes(dbs.minigame.kenomax2_results , [idx.TTL, idx.time_archive, idx.roundId]),

    $Indexes(dbs.minigame.kenomini_phiens  , [idx.TTL, idx.time, idx.id, idx.summarized_id]),
    $Indexes(dbs.minigame.kenomini_cuocs   , [idx.TTL, idx.time_archive, idx.uid__id, ...BL.cuocs]),
    $Indexes(dbs.minigame.kenomini_ones    , [idx.TTL, idx.time_archive, idx.currency, idx.isCash, ...BL.ones]),
    $Indexes(dbs.minigame.kenomini_tmpbets , [idx.timeTTL,       idx.roundId__id, idx.uid_roundId]),
    $Indexes(dbs.minigame.kenomini_results , [idx.TTL, idx.time_archive, idx.roundId]),

    $Indexes(dbs.minigame.kenomini2_phiens , [idx.TTL, idx.time, idx.id, idx.summarized_id]),
    $Indexes(dbs.minigame.kenomini2_cuocs  , [idx.TTL, idx.time_archive, idx.uid__id, ...BL.cuocs]),
    $Indexes(dbs.minigame.kenomini2_ones   , [idx.TTL, idx.time_archive, idx.currency, idx.isCash, ...BL.ones]),
    $Indexes(dbs.minigame.kenomini2_tmpbets, [idx.timeTTL,       idx.roundId__id, idx.uid_roundId]),
    $Indexes(dbs.minigame.kenomini2_results, [idx.TTL, idx.time_archive, idx.roundId]),

    $Indexes(dbs.minigame.kenoeast_phiens  , [idx.TTL, idx.time, idx.id, idx.summarized_id]),
    $Indexes(dbs.minigame.kenoeast_cuocs   , [idx.TTL, idx.time_archive, idx.uid__id, ...BL.cuocs]),
    $Indexes(dbs.minigame.kenoeast_ones    , [idx.TTL, idx.time_archive, idx.currency, idx.isCash, ...BL.ones]),
    $Indexes(dbs.minigame.kenoeast_tmpbets , [idx.timeTTL,       idx.roundId__id, idx.uid_roundId]),
    $Indexes(dbs.minigame.kenoeast_results , [idx.TTL, idx.time_archive, idx.roundId]),

    $Indexes(dbs.minigame.kenowest_phiens  , [idx.TTL, idx.time, idx.id, idx.summarized_id]),
    $Indexes(dbs.minigame.kenowest_cuocs   , [idx.TTL, idx.time_archive, idx.uid__id, ...BL.cuocs]),
    $Indexes(dbs.minigame.kenowest_ones    , [idx.TTL, idx.time_archive, idx.currency, idx.isCash, ...BL.ones]),
    $Indexes(dbs.minigame.kenowest_tmpbets , [idx.timeTTL,       idx.roundId__id, idx.uid_roundId]),
    $Indexes(dbs.minigame.kenowest_results , [idx.TTL, idx.time_archive, idx.roundId]),

    $Indexes(dbs.minigame.kenosouth_phiens , [idx.TTL, idx.time, idx.id, idx.summarized_id]),
    $Indexes(dbs.minigame.kenosouth_cuocs  , [idx.TTL, idx.time_archive, idx.uid__id, ...BL.cuocs]),
    $Indexes(dbs.minigame.kenosouth_ones   , [idx.TTL, idx.time_archive, idx.currency, idx.isCash, ...BL.ones]),
    $Indexes(dbs.minigame.kenosouth_tmpbets, [idx.timeTTL,       idx.roundId__id, idx.uid_roundId]),
    $Indexes(dbs.minigame.kenosouth_results, [idx.TTL, idx.time_archive, idx.roundId]),

    $Indexes(dbs.minigame.kenonorth_phiens , [idx.TTL, idx.time, idx.id, idx.summarized_id]),
    $Indexes(dbs.minigame.kenonorth_cuocs  , [idx.TTL, idx.time_archive, idx.uid__id, ...BL.cuocs]),
    $Indexes(dbs.minigame.kenonorth_ones   , [idx.TTL, idx.time_archive, idx.currency, idx.isCash, ...BL.ones]),
    $Indexes(dbs.minigame.kenonorth_tmpbets, [idx.timeTTL,       idx.roundId__id, idx.uid_roundId]),
    $Indexes(dbs.minigame.kenonorth_results, [idx.TTL, idx.time_archive, idx.roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs   = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  [ $Collection(dbs.minigame_arc.kenomax_phiens_bk    , {storageEngine}),
    $Collection(dbs.minigame_arc.kenomax_cuocs_bk     , {storageEngine}),
    $Collection(dbs.minigame_arc.kenomax_ones_bk      , {storageEngine}),
    $Collection(dbs.minigame_arc.kenomax_results_bk   , {storageEngine}),

    $Collection(dbs.minigame_arc.kenomax2_phiens_bk   , {storageEngine}),
    $Collection(dbs.minigame_arc.kenomax2_cuocs_bk    , {storageEngine}),
    $Collection(dbs.minigame_arc.kenomax2_ones_bk     , {storageEngine}),
    $Collection(dbs.minigame_arc.kenomax2_results_bk  , {storageEngine}),

    $Collection(dbs.minigame_arc.kenomini_phiens_bk   , {storageEngine}),
    $Collection(dbs.minigame_arc.kenomini_cuocs_bk    , {storageEngine}),
    $Collection(dbs.minigame_arc.kenomini_ones_bk     , {storageEngine}),
    $Collection(dbs.minigame_arc.kenomini_results_bk  , {storageEngine}),

    $Collection(dbs.minigame_arc.kenomini2_phiens_bk  , {storageEngine}),
    $Collection(dbs.minigame_arc.kenomini2_cuocs_bk   , {storageEngine}),
    $Collection(dbs.minigame_arc.kenomini2_ones_bk    , {storageEngine}),
    $Collection(dbs.minigame_arc.kenomini2_results_bk , {storageEngine}),

    $Collection(dbs.minigame_arc.kenoeast_phiens_bk   , {storageEngine}),
    $Collection(dbs.minigame_arc.kenoeast_cuocs_bk    , {storageEngine}),
    $Collection(dbs.minigame_arc.kenoeast_ones_bk     , {storageEngine}),
    $Collection(dbs.minigame_arc.kenoeast_results_bk  , {storageEngine}),

    $Collection(dbs.minigame_arc.kenowest_phiens_bk   , {storageEngine}),
    $Collection(dbs.minigame_arc.kenowest_cuocs_bk    , {storageEngine}),
    $Collection(dbs.minigame_arc.kenowest_ones_bk     , {storageEngine}),
    $Collection(dbs.minigame_arc.kenowest_results_bk  , {storageEngine}),

    $Collection(dbs.minigame_arc.kenosouth_phiens_bk  , {storageEngine}),
    $Collection(dbs.minigame_arc.kenosouth_cuocs_bk   , {storageEngine}),
    $Collection(dbs.minigame_arc.kenosouth_ones_bk    , {storageEngine}),
    $Collection(dbs.minigame_arc.kenosouth_results_bk , {storageEngine}),

    $Collection(dbs.minigame_arc.kenonorth_phiens_bk  , {storageEngine}),
    $Collection(dbs.minigame_arc.kenonorth_cuocs_bk   , {storageEngine}),
    $Collection(dbs.minigame_arc.kenonorth_ones_bk    , {storageEngine}),
    $Collection(dbs.minigame_arc.kenonorth_results_bk , {storageEngine}),
  ].forEach(_ => { _.create(); _.validate(); });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.kenomax_phiens_bk   , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenomax_cuocs_bk    , [          idx.phien, idx.memberId_phien_F, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenomax_ones_bk     , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
    $Indexes(dbs.minigame_arc.kenomax_results_bk  , [          idx.roundId]),

    $Indexes(dbs.minigame_arc.kenomax2_phiens_bk  , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenomax2_cuocs_bk   , [          idx.phien, idx.memberId_phien_F, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenomax2_ones_bk    , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
    $Indexes(dbs.minigame_arc.kenomax2_results_bk , [          idx.roundId]),

    $Indexes(dbs.minigame_arc.kenomini_phiens_bk  , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenomini_cuocs_bk   , [          idx.phien, idx.memberId_phien_F, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenomini_ones_bk    , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
    $Indexes(dbs.minigame_arc.kenomini_results_bk , [          idx.roundId]),

    $Indexes(dbs.minigame_arc.kenomini2_phiens_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenomini2_cuocs_bk  , [          idx.phien, idx.memberId_phien_F, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenomini2_ones_bk   , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
    $Indexes(dbs.minigame_arc.kenomini2_results_bk, [          idx.roundId]),

    $Indexes(dbs.minigame_arc.kenoeast_phiens_bk  , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenoeast_cuocs_bk   , [          idx.phien, idx.memberId_phien_F, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenoeast_ones_bk    , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
    $Indexes(dbs.minigame_arc.kenoeast_results_bk , [          idx.roundId]),

    $Indexes(dbs.minigame_arc.kenowest_phiens_bk  , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenowest_cuocs_bk   , [          idx.phien, idx.memberId_phien_F, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenowest_ones_bk    , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
    $Indexes(dbs.minigame_arc.kenowest_results_bk , [          idx.roundId]),

    $Indexes(dbs.minigame_arc.kenosouth_phiens_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenosouth_cuocs_bk  , [          idx.phien, idx.memberId_phien_F, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenosouth_ones_bk   , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
    $Indexes(dbs.minigame_arc.kenosouth_results_bk, [          idx.roundId]),

    $Indexes(dbs.minigame_arc.kenonorth_phiens_bk , [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.kenonorth_cuocs_bk  , [          idx.phien, idx.memberId_phien_F, idx.uid_phien]),
    $Indexes(dbs.minigame_arc.kenonorth_ones_bk   , [idx.time, idx.phien, idx.memberId_phien_F, idx.uid_phien_U]),
    $Indexes(dbs.minigame_arc.kenonorth_results_bk, [          idx.roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}
