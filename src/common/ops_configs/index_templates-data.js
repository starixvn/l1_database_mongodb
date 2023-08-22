deploy: {
  const dbs = DBs(db);
  const label = `index_templates@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;

  if (![1, 2, 3].includes(L)) break deploy;
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
            isCash: '{"key":{"__archive.isCash":1,"isCash":1,"playerId":1,"uid":1}}',
            playerId_id_F: '{"key":{"playerId":1,"id":1},"partialFilterExpression":{"playerId":{"$gt":0}}}',
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
            isCash: '{"key":{"__archive.isCash":1,"isCash":1,"playerId":1,"uid":1}}',
            playerId_id_F: '{"key":{"playerId":1,"id":1},"partialFilterExpression":{"playerId":{"$gt":0}}}',
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
  ];
}
