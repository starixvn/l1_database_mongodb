/** L1 L2 -- */
deploy: {
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  // loadScript(`../../common/minigame/minigame-spin-indexes.js`);
  const idx = {
    // ...___idx,
    memberId_U          : $Index({'memberId': 1}, {unique: true}),
    id_U                : $Index({'id': 1}, {unique: true}),
    memberId            : $Index({'memberId': 1}),
    time_memberId       : $Index({'time': 1, 'memberId': 1}),
    roundId_memberId    : $Index({'roundId': 1, 'memberId': 1}),
    roundId_memberId_FU : $Index({'roundId': 2, 'memberId': 1}, {unique: true, partialFilterExpression: {roundId: {$type: `double`}}}),
    memberId_time       : $Index({'memberId': 1, 'time': 1}),
  };
  const idxs = [
    // ...___idxs,
    $Indexes(dbs.minigame.spins       , [idx.memberId_U]),
    $Indexes(dbs.minigame.spin_results, [idx.id_U, idx.memberId, idx.time_memberId]),
    $Indexes(dbs.minigame.spin_logs   , [idx.roundId_memberId, idx.roundId_memberId_FU, idx.memberId_time]),
  ];
  idxs.forEach(_ => _.deploy());

  dbs.minigame.runCommand({
    collMod: `spin_logs`,
    validator: { $jsonSchema: {
      bsonType: `object`,
      required: [`time`, `memberId`, `spinCnt`, `source`],
      properties: {
        roundId: {bsonType: `double`},
        key: {bsonType: `string`},
        spinCnt: {bsonType: `double`},
      },
    }},
  });
}
