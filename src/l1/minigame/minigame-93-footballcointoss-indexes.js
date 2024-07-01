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
  const idxs = [
    $Indexes(dbs.minigame.footballcointoss_rounds, [idx.TTL, idx.time, idx.id]),
    $Indexes(dbs.minigame.footballcointoss_betlogs, [idx.TTL, idx.time_archive, idx.roundId__id, idx.playerId_roundId_F]),
    $Indexes(dbs.minigame.footballcointoss_bets, [
      idx.TTL,
      idx.time_archive,
      idx.currency,
      idx.__archive_summarized,
      idx.__archive_do_summary,
      idx.roundId__id,
      idx.playerId_roundId_F,
      idx.uid_roundId,
    ]),
    $Indexes(dbs.minigame.footballcointoss_matches, [$Index({ startTime: 1 })]),
    $Indexes(dbs.minigame.footballcointoss_results, [idx.TTL, idx.time_archive, idx.roundId]),
    $Indexes(dbs.minigame.footballcointoss_tmpbets, [idx.timeTTL, idx.roundId__id, idx.uid_roundId]),
  ];
  idxs.forEach((_) => _.deploy());

  dbs.minigame.footballcointoss_matches.bulkWrite(
    [
      {
        updateOne: {
          filter: { startTime: ISODate("2024-07-01T16:00:00Z") },
          update: { $set: { home: "FRA", away: "BEL" } },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { startTime: ISODate("2024-07-01T19:00:00Z") },
          update: { $set: { home: "POR", away: "SVN" } },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { startTime: ISODate("2024-07-02T16:00:00Z") },
          update: { $set: { home: "ROU", away: "NED" } },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { startTime: ISODate("2024-07-02T19:00:00Z") },
          update: { $set: { home: "AUT", away: "TUR" } },
          upsert: true,
        },
      },
      // PROD
      {
        updateOne: {
          filter: { startTime: ISODate("2024-07-05T16:00:00Z") },
          update: { $set: { home: "ESP", away: "GER" } },
          upsert: true,
        },
      },
      // {
      //   updateOne: {
      //     filter: { startTime: ISODate("2024-07-05T19:00:00Z") },
      //     update: { $set: { home: "W41", away: "W42" } },
      //     // update: { $set: { home: "FRA", away: "POR" } },
      //     // update: { $set: { home: "BEL", away: "SVN" } },
      //     upsert: true,
      //   },
      // },
      {
        updateOne: {
          filter: { startTime: ISODate("2024-07-06T16:00:00Z") },
          update: { $set: { home: "ENG", away: "SUI" } },
          upsert: true,
        },
      },
      // {
      //   updateOne: {
      //     filter: { startTime: ISODate("2024-07-06T19:00:00Z") },
      //     update: { $set: { home: "W43", away: "W44" } },
      //     // update: { $set: { home: "ROU", away: "AUT" } },
      //     // update: { $set: { home: "NED", away: "TUR" } },
      //     upsert: true,
      //   },
      // },
      // {
      //   updateOne: {
      //     filter: { startTime: ISODate("2024-07-09T19:00:00Z") },
      //     update: { $set: { home: "W45", away: "W46" } },
      //     upsert: true,
      //   },
      // },
      // {
      //   updateOne: {
      //     filter: { startTime: ISODate("2024-07-10T19:00:00Z") },
      //     update: { $set: { home: "W47", away: "W48" } },
      //     upsert: true,
      //   },
      // },
      // {
      //   updateOne: {
      //     filter: { startTime: ISODate("2024-07-14T19:00:00Z") },
      //     update: { $set: { home: "W49", away: "W50" } },
      //     upsert: true,
      //   },
      // },
    ],
    { ordered: false }
  );
}

deploy: {
  const dbs = DBs(db);
  const label = `minigame_arc-game@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const storageEngine = { wiredTiger: { configString: "block_compressor=zstd" } };
  [
    $Collection(dbs.minigame_arc.footballcointoss_rounds_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.footballcointoss_betlogs_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.footballcointoss_bets_bk, { storageEngine }),
    $Collection(dbs.minigame_arc.footballcointoss_results_bk, { storageEngine }),
  ].forEach((_) => {
    _.create();
    _.validate();
  });

  if (!global.___idx?.[label]) loadScript(`../../common/minigame/minigame_arc-game-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    $Indexes(dbs.minigame_arc.footballcointoss_rounds_bk, [idx.time, idx.id]),
    $Indexes(dbs.minigame_arc.footballcointoss_betlogs_bk, [idx.roundId, idx.playerId_roundId_F, idx.uid_roundId]),
    $Indexes(dbs.minigame_arc.footballcointoss_bets_bk, [idx.time, idx.roundId, idx.playerId_roundId_F, idx.uid_roundId_U]),
    $Indexes(dbs.minigame_arc.footballcointoss_results_bk, [idx.roundId]),
  ];
  idxs.forEach((_) => _.deploy());
}
