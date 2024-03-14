deploy: {
  const dbs = DBs(db);
  const label = `index_templates@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;

  if (![1, 2, 4].includes(L)) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  (global.___data = global.___data ?? {})[label] = [
    {
      category: "games",
      type: 2,
      colls: [
        {
          ns: { db: "minigame", postfix: "_rounds" },
          idxs: {
            TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
            time: '{"key":{"time":1}}',
            id_U: '{"key":{"id":1},"unique":true}',
            summarized: '{"key":{"__archive.summarized":1}}',
            do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
            paid_uid: '{"key":{"paid":1,"uid":1}}',
            currency: '{"key":{"__archive.currency":1,"currency":1,"playerId":1,"uid":1}}',
            playerId_id_F: '{"key":{"playerId":1,"id":1},"partialFilterExpression":{"$or":[{"playerId":{"$gt":0}},{"playerId":{"$gt":""}}]}}',
          },
        },
        {
          ns: { db: "minigame", postfix: "_freespins" },
          idxs: {
            TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
            time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
            id_U: '{"key":{"id":1},"unique":true}',
            expiryTime: '{"key":{"expiryTime":1}}',
          },
        },
        {
          ns: { db: "minigame", postfix: "_fames" },
          idxs: {
            TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
            time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
            uid_roundId_U: '{"key":{"uid":1,"roundId":1},"unique":true}',
          },
        },
      ],
    },
    {
      category: "games",
      type: 3,
      colls: [
        {
          ns: { db: "minigame", postfix: "_rounds" },
          idxs: {
            TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
            time: '{"key":{"time":1}}',
            id_U: '{"key":{"id":1},"unique":true}',
            summarized: '{"key":{"__archive.summarized":1}}',
            do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
            paid_uid: '{"key":{"paid":1,"uid":1}}',
            currency: '{"key":{"__archive.currency":1,"currency":1,"playerId":1,"uid":1}}',
            playerId_id_F: '{"key":{"playerId":1,"id":1},"partialFilterExpression":{"$or":[{"playerId":{"$gt":0}},{"playerId":{"$gt":""}}]}}',
          },
        },
        {
          ns: { db: "minigame", postfix: "_freespins" },
          idxs: {
            TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
            time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
            id_U: '{"key":{"id":1},"unique":true}',
            expiryTime: '{"key":{"expiryTime":1}}',
          },
        },
        {
          ns: { db: "minigame", postfix: "_multipliers" },
          idxs: {
            TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
            time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
            playerId: '{"key":{"playerId":1}}',
            uid_ended_F: '{"key":{"uid":1,"ended":1},"unique":true,"partialFilterExpression":{"ended":false}}',
          },
        },
      ],
    },
    {
      category: "games",
      type: 5,
      colls: [
        {
          ns: { db: "minigame", postfix: "_rounds" },
          idxs: {
            TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
            time: '{"key":{"time":1}}',
            id_U: '{"key":{"id":1},"unique":true}',
          },
        },
        {
          ns: { db: "minigame", postfix: "_results" },
          idxs: {
            TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
            time: '{"key":{"time":1}}',
            roundId_U: '{"key":{"roundId":1},"unique":true}',
          },
        },
        {
          ns: { db: "minigame", postfix: "_livegamelogs" },
          idxs: {
            TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
            time: '{"key":{"time":1}}',
            roundId: '{"key":{"roundId":1}}',
          },
        },
        {
          ns: { db: "minigame", postfix: "_betlogs" },
          idxs: {
            TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
            time: '{"key":{"time":1}}',
            roundId: '{"key":{"roundId":1,"_id":1}}',
            player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"$or":[{"playerId":{"$gt":0}},{"playerId":{"$gt":""}}]}}',
            uid: '{"key":{"uid":1}}',
          },
        },
        {
          ns: { db: "minigame", postfix: "_bets" },
          idxs: {
            TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
            time: '{"key":{"time":1}}',
            roundId: '{"key":{"roundId":1,"_id":1}}',
            player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"$or":[{"playerId":{"$gt":0}},{"playerId":{"$gt":""}}]}}',
            uid_roundId: '{"key":{"uid":1,"roundId":1},"unique":true}',
            uid_paid: '{"key":{"uid":1,"paid":1,"_id":1}}',
            summarized: '{"key":{"__archive.summarized":1}}',
            do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
          },
        },
        {
          ns: { db: "minigame", postfix: "_tmpbetlogs" },
          idxs: {
            timeTTL: '{"key":{"time":1},"expireAfterSeconds":1200}',
            roundId: '{"key":{"roundId":1,"_id":1}}',
            uid: '{"key":{"uid":1}}',
          },
        },
        {
          ns: { db: "minigame", postfix: "_tmpbets" },
          idxs: {
            timeTTL: '{"key":{"time":1},"expireAfterSeconds":1200}',
            roundId: '{"key":{"roundId":1,"_id":1}}',
            uid_roundId: '{"key":{"uid":1,"roundId":1}}',
          },
        },
      ],
    },
  ];
}
