deploy: {
  const dbs = DBs(db);
  const label = `minigame-game@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;

  if (![1, 2, 3].includes(L)) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  const mapping = {
    playerId: {
      [1]: `playerId`,
      [2]: `playerId`,
      [3]: `memberId`,
    }[L],
  };

  const expireHours = 3600 * 24 * 8;

  (global.___idx = global.___idx ?? {})[label] = {
    TTL: $Index({ "__archive.eventtime": 1 }, { expireAfterSeconds: expireHours }),
    currency: $Index({ "__archive.currency": 1, currency: 1, [mapping.playerId]: 1, uid: 1 }),
    ended: $Index({ ended: 1 }),
    endTime: $Index({ endTime: 1 }),
    isAvailable: $Index({ isAvailable: 1 }, { unique: true, partialFilterExpression: { isAvailable: true } }),
    id: $Index({ id: 1 }, { unique: true }),
    isCash: $Index({ "__archive.isCash": 1, isCash: 1, [mapping.playerId]: 1, uid: 1 }),
    memberId_id_F: $Index({ memberId: 1, id: 1 }, { partialFilterExpression: { memberId: { $gt: 0 } } }),
    memberId_phien_F: $Index({ memberId: 1, phien: 1 }, { partialFilterExpression: { memberId: { $gt: 0 } } }),
    memberId_roundId_F: $Index({ memberId: 1, roundId: 1 }, { partialFilterExpression: { memberId: { $gt: 0 } } }),
    playerId_id_F: $Index({ playerId: 1, id: 1 }, { partialFilterExpression: { playerId: { $gt: 0 } } }),
    playerId_roundId_F: $Index({ playerId: 1, roundId: 1 }, { partialFilterExpression: { playerId: { $gt: 0 } } }),
    phien__id: $Index({ phien: 1, _id: 1 }),
    roundId: $Index({ roundId: 1 }),
    roundId__id: $Index({ roundId: 1, _id: 1 }),
    roundId_archive_playerId: $Index({ roundId: 1, "__archive.eventtime": 1, playerId: 1 }),
    roundId_uid: $Index({ roundId: 1, uid: 1 }),
    summarized_id: $Index({ "__archive.summarized": 1, paid: 1, time: 1, id: 1 }),
    __archive_summarized: $Index({ "__archive.summarized": 1 }),
    __archive_do_summary: $Index({ "__archive.do_summary": 1 }, { partialFilterExpression: { "__archive.do_summary": true } }),
    time: $Index({ time: 1 }),
    time_archive: $Index({ time: 1, "__archive.eventtime": 1 }),
    timeTTL: $Index({ time: 1 }, { expireAfterSeconds: 120 }),
    uid__id: $Index({ uid: 1, _id: 1 }),
    uid_phien: $Index({ uid: 1, phien: 1 }, { unique: true, partialFilterExpression: { phien: { $gt: 0 } } }),
    uid_roundId: $Index({ uid: 1, roundId: 1 }, { unique: true }),
    uid_phien_freeBet: $Index({ uid: 1, phien: 1, freeBet: 1 }, { unique: true, partialFilterExpression: { phien: { $gt: 0 } } }),
    uid_roundId_freeBet: $Index({ uid: 1, roundId: 1, freeBet: 1 }, { unique: true }),
    uid_paid__id: $Index({ uid: 1, paid: 1, _id: 1 }),
    uid_thanhtoan__id: $Index({ uid: 1, thanhtoan: 1, _id: 1 }),
    metric_metadata_U: $Index({ metric: 1, metadata: 1 }, { unique: true }),
  };
}
