/** L1 L2 -- */
deploy: {
  const dbs   = DBs(db);
  const label = `minigame-slot@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;
  if (path.basename(path.resolve(`..`)) != `l${L}`) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame-slot-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const BL = {
    rounds: {
      [1]: ($_ = [idx.playerId_id_F]), [2]: $_,
      [3]: [idx.memberId_id_F],
    }[L],
  };
  const idxs = [
    $Indexes(dbs.minigame.nightclub_rounds    , [idx.TTL, idx.time, idx.id, idx.summarized_id, idx.paid_uid, idx.currency, idx.isCash, ...BL.rounds]),
    $Indexes(dbs.minigame.nightclub_freespins , [idx.TTL, idx.time_archive, idx.id, idx.expiryTime]),
    $Indexes(dbs.minigame.nightclub_fames     , [idx.TTL, idx.time_archive, idx.uid_roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs   = DBs(db);
  const label = `minigame_arc-slot@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  [ $Collection(dbs.minigame_arc.nightclub_rounds_bk   , {storageEngine}),
    $Collection(dbs.minigame_arc.nightclub_freespins_bk, {storageEngine}),
    $Collection(dbs.minigame_arc.nightclub_fames_bk    , {storageEngine}),
  ].forEach(_ => { _.create(); _.validate(); });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-slot-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.nightclub_rounds_bk    , [idx.time, idx.id, idx.memberId_id_F, idx.uid_id]),
    $Indexes(dbs.minigame_arc.nightclub_freespins_bk , [          idx.id, idx.expiryTime]),
    $Indexes(dbs.minigame_arc.nightclub_fames_bk     , [idx.time, idx.uid_roundId]),
  ];
  idxs.forEach(_ => _.deploy());
}
