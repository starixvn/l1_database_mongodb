deploy: {
  const dbs = DBs(db);
  const label = `archive_templates@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;

  if (![1, 2, 3].includes(L)) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  (global.___data = global.___data ?? {})[label] = [
    {
      category: "games",
      type: 2,
      data: [
        {
          id: 0,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "endTime" },
          config: { cutOffsetHours: -2, localField: "id" },
          filter: '{"playerId":{"$gt":0}}',
          childs: [
            {
              from: { db: "minigame", postfix: "_fames" },
              to: { db: "minigame_arc", postfix: "_fames_bk" },
              config: { foreignField: "roundId" },
              filter: '{"playerId":{"$gt":0}}',
            },
            {
              from: { db: "minigame", postfix: "_freespins" },
              to: { db: "minigame_arc", postfix: "_freespins_bk" },
              config: { foreignField: "roundId" },
              filter: '{"playerId":{"$gt":0}}',
              log: { field: "_freespins", value: "id" },
            },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          id: 1,
          from: { db: "minigame", postfix: "_freespins" },
          to: { db: "minigame_arc", postfix: "_freespins_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -8 * 24 },
          filter: '{"playerId":{"$gt":0}}',
          log: { field: "_freespins", value: "id" },
        },
        {
          id: 2,
          from: { db: "minigame", postfix: "_freespins" },
          to: { db: "minigame_arc", postfix: "_freespins_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -8 * 24, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          id: 3,
          from: { db: "minigame", postfix: "_fames" },
          to: { db: "minigame_arc", postfix: "_fames_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -8 * 24 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          id: 4,
          from: { db: "minigame", postfix: "_fames" },
          to: { db: "minigame_arc", postfix: "_fames_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -8 * 24, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ],
      targets: [{ db: "ops_configs", coll: "archive_configs" }],
    },
    {
      category: "games",
      type: 3,
      data: [
        {
          id: 0,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "endTime" },
          config: { cutOffsetHours: -2, localField: "id" },
          filter: '{"playerId":{"$gt":0}}',
          childs: [
            {
              from: { db: "minigame", postfix: "_freespins" },
              to: { db: "minigame_arc", postfix: "_freespins_bk" },
              config: { foreignField: "roundId" },
              filter: '{"playerId":{"$gt":0}}',
              log: { field: "_freespins", value: "id" },
            },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          id: 1,
          from: { db: "minigame", postfix: "_freespins" },
          to: { db: "minigame_arc", postfix: "_freespins_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -8 * 24 },
          filter: '{"playerId":{"$gt":0}}',
          log: { field: "_freespins", value: "id" },
        },
        {
          id: 2,
          from: { db: "minigame", postfix: "_freespins" },
          to: { db: "minigame_arc", postfix: "_freespins_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -8 * 24, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          id: 3,
          from: { db: "minigame", postfix: "_multipliers" },
          to: { db: "minigame_arc", postfix: "_multipliers_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -8 * 24 },
          filter: '{"ended":true}',
        },
      ],
      targets: [{ db: "ops_configs", coll: "archive_configs" }],
    },
  ];
}
