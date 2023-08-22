deploy: {
  const dbs = DBs(db);
  const label = `archive_configs@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;

  if (![1, 2, 3].includes(L)) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  const archiveConfigData = [];

  /** Logs */
  {
    const commonConfig = { category: "logs", type: 0 };

    [
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "log", name: "audit_events" },
        from: { db: "log", postfix: "" },
        to: { db: "log_arc", postfix: "_bk" },
        alias: { time: "StartDate" },
      },
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "log", name: "bets" },
        from: { db: "log", postfix: "" },
        to: { db: "log_arc", postfix: "_bk" },
        alias: { time: "requestTimeStamp" },
      },
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "log", name: "end_games" },
        from: { db: "log", postfix: "" },
        to: { db: "log_arc", postfix: "_bk" },
        alias: { time: "requestTimeStamp" },
      },
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "log", name: "failed_requests" },
        from: { db: "log", postfix: "" },
        to: { db: "log_arc", postfix: "_bk" },
        alias: { time: "requestTimeStamp" },
      },
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "log", name: "hit_jackpots" },
        from: { db: "log", postfix: "" },
        to: { db: "log_arc", postfix: "_bk" },
        alias: { time: "requestTimeStamp" },
      },
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "log", name: "membersignin_requests" },
        from: { db: "log", postfix: "" },
        to: { db: "log_arc", postfix: "_bk" },
        alias: { time: "requestTimeStamp" },
      },
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "log", name: "owsignin_requests" },
        from: { db: "log", postfix: "" },
        to: { db: "log_arc", postfix: "_bk" },
        alias: { time: "requestTimeStamp" },
      },
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "log", name: "retrieve_requests" },
        from: { db: "log", postfix: "" },
        to: { db: "log_arc", postfix: "_bk" },
        alias: { time: "requestTimeStamp" },
      },
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "log", name: "signin_requests" },
        from: { db: "log", postfix: "" },
        to: { db: "log_arc", postfix: "_bk" },
        alias: { time: "requestTimeStamp" },
      },
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "log", name: "ticket_detail_requests" },
        from: { db: "log", postfix: "" },
        to: { db: "log_arc", postfix: "_bk" },
        alias: { time: "requestTimeStamp" },
      },
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "log", name: "void_games" },
        from: { db: "log", postfix: "" },
        to: { db: "log_arc", postfix: "_bk" },
        alias: { time: "requestTimeStamp" },
      },
    ].forEach((config) => archiveConfigData.push(config));
  }

  /** Member */
  {
    const commonConfig = { category: "member", type: 0 };

    [
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "member", name: "member_auths" },
        from: { db: "member", postfix: "" },
        to: { db: "member_arc", postfix: "_bk" },
        alias: { time: "time" },
      },
    ].forEach((config) => archiveConfigData.push(config));
  }

  /** Games */
  {
    const commonConfig = { category: "games", type: 0 };

    /** { gameId: 1, name: "taixiu" } */
    {
      const gameConfigs = { gameId: 1, name: "taixiu" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 2, name: "xocxoc" } */
    {
      const gameConfigs = { gameId: 2, name: "xocxoc" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 3, name: "baucua" } */
    {
      const gameConfigs = { gameId: 3, name: "baucua" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 4, name: "txturbo" } */
    {
      const gameConfigs = { gameId: 4, name: "txturbo" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 5, name: "chanle" } // retired */

    /** { gameId: 6, name: "chanleturbo" } */
    {
      const gameConfigs = { gameId: 6, name: "chanleturbo" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 7, name: "minidragontiger" } */
    {
      const gameConfigs = { gameId: 7, name: "minidragontiger" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [{ from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' }],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 8, name: "kenopromax" } */
    {
      const gameConfigs = { gameId: 8, name: "kenopromax" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [{ from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' }],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 9, name: "minisedie" } */
    {
      const gameConfigs = { gameId: 9, name: "minisedie" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 10, name: "baccarat" } */
    {
      const gameConfigs = { gameId: 10, name: "baccarat" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 11, name: "kenoproviet" } // retired */
    /** { gameId: 12, name: "kenomax" } // retired */
    /** { gameId: 13, name: "kenomax2" } // retired */

    /** { gameId: 14, name: "kenomini" } */
    {
      const gameConfigs = { gameId: 14, name: "kenomini" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 15, name: "kenomini2" } */
    {
      const gameConfigs = { gameId: 15, name: "kenomini2" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 16, name: "kenoeast" } */
    {
      const gameConfigs = { gameId: 16, name: "kenoeast" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 17, name: "kenowest" } */
    {
      const gameConfigs = { gameId: 17, name: "kenowest" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 18, name: "kenosouth" } */
    {
      const gameConfigs = { gameId: 18, name: "kenosouth" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 19, name: "kenonorth" } */
    {
      const gameConfigs = { gameId: 19, name: "kenonorth" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 20, name: "bolatangkas" } // vg3 */

    /** { gameId: 21, name: "roulette" } */
    {
      const gameConfigs = { gameId: 21, name: "roulette" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 22, name: "vipsedie" } */
    {
      const gameConfigs = { gameId: 22, name: "vipsedie" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 23, name: "blackjack" } */
    {
      const gameConfigs = { gameId: 23, name: "blackjack" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            {
              from: { db: "minigame", postfix: "_cuocs" },
              to: { db: "minigame_arc", postfix: "_cuocs_bk" },
              config: { foreignField: "roundId" },
              filter: '{"playerId":{"$gt":0}}',
              log: { field: "_cuocs", value: "id" },
            },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
          log: { field: "_cuocs", value: "id" },
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 24, name: "specialsedie" } */
    {
      const gameConfigs = { gameId: 24, name: "specialsedie" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 25, name: "sicbo" } */
    {
      const gameConfigs = { gameId: 25, name: "sicbo" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 26, name: "vipfishprawncrab" } */
    {
      const gameConfigs = { gameId: 26, name: "vipfishprawncrab" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [{ from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' }],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 27, name: "vipbaccarat" } */
    {
      const gameConfigs = { gameId: 27, name: "vipbaccarat" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 28, name: "vipsediewar" } */
    {
      const gameConfigs = { gameId: 28, name: "vipsediewar" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 29, name: "fourguardians" } // auto */
    /** { gameId: 30, name: "fishprawncrabpro" } // vg3 */

    /** { gameId: 31, name: "lottery" } */
    {
      const gameConfigs = { gameId: 31, name: "lottery" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 32, name: "baccaratdiamond" } // vg3 */
    /** { gameId: 33, name: "baccaratsapphire" } // vg3 */
    /** { gameId: 34, name: "baccaratruby" } // vg3 */

    /** { gameId: 35, name: "threecards" } */
    {
      const gameConfigs = { gameId: 35, name: "threecards" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 36, name: "kenomatch1" } */
    {
      const gameConfigs = { gameId: 36, name: "kenomatch1" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 37, name: "kenomatch2" } */
    {
      const gameConfigs = { gameId: 37, name: "kenomatch2" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 38, name: "heroesslot" } // auto */

    /** { gameId: 39, name: "casinoholdempoker" } */
    {
      const gameConfigs = { gameId: 39, name: "casinoholdempoker" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            {
              from: { db: "minigame", postfix: "_cuocs" },
              to: { db: "minigame_arc", postfix: "_cuocs_bk" },
              config: { foreignField: "roundId" },
              filter: '{"playerId":{"$gt":0}}',
            },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 40, name: "kenopower1" } */
    {
      const gameConfigs = { gameId: 40, name: "kenopower1" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 41, name: "kenopower2" } */
    {
      const gameConfigs = { gameId: 41, name: "kenopower2" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 42, name: "texasholdempoker" } */
    {
      const gameConfigs = { gameId: 42, name: "texasholdempoker" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_phiens" },
          to: { db: "minigame_arc", postfix: "_phiens_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_cuocs" }, to: { db: "minigame_arc", postfix: "_cuocs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_phiens", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_cuocs" },
          to: { db: "minigame_arc", postfix: "_cuocs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 43, name: "bitcoinmaster" } */
    {
      const gameConfigs = { gameId: 43, name: "bitcoinmaster" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_betlogs" }, to: { db: "minigame_arc", postfix: "_betlogs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs: { gameId: 43, name: "crypto_candlesticks" },
          from: { db: "minigame", postfix: "" },
          to: { db: "minigame_arc", postfix: "_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 44, name: "paigowpoker" } // vg3 */

    /** { gameId: 45, name: "hilo" } */
    {
      const gameConfigs = { gameId: 45, name: "hilo" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [{ from: { db: "minigame", postfix: "_betlogs" }, to: { db: "minigame_arc", postfix: "_betlogs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' }],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 46, name: "nightclub" } // auto */
    /** { gameId: 47, name: "treasureisland" } // auto */

    /** { gameId: 48, name: "blockchainbaccarat" } */
    {
      const gameConfigs = { gameId: 48, name: "blockchainbaccarat" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" }, filter: '{"isAvailable":false}' },
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"isAvailable":false}',
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 49, name: "waytogoal" } // auto */

    /** { gameId: 50, name: "unbalancedbigsmall1" } */
    {
      const gameConfigs = { gameId: 50, name: "unbalancedbigsmall1" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_betlogs" }, to: { db: "minigame_arc", postfix: "_betlogs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 51, name: "unbalancedbigsmall2" } */
    {
      const gameConfigs = { gameId: 51, name: "unbalancedbigsmall2" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_betlogs" }, to: { db: "minigame_arc", postfix: "_betlogs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 52, name: "megakeno" } */
    {
      const gameConfigs = { gameId: 52, name: "megakeno" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 53, name: "megakeno2" } */
    {
      const gameConfigs = { gameId: 53, name: "megakeno2" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
            { from: { db: "minigame", postfix: "_ones" }, to: { db: "minigame_arc", postfix: "_ones_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_ones" },
          to: { db: "minigame_arc", postfix: "_ones_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 54, name: "unbalancedbigsmall3" } */
    {
      const gameConfigs = { gameId: 54, name: "unbalancedbigsmall3" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_betlogs" }, to: { db: "minigame_arc", postfix: "_betlogs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 55, name: "unbalancedbigsmall4" } */
    {
      const gameConfigs = { gameId: 55, name: "unbalancedbigsmall4" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_betlogs" }, to: { db: "minigame_arc", postfix: "_betlogs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 56, name: "minisedie2" } */
    {
      const gameConfigs = { gameId: 56, name: "minisedie2" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 57, name: "minisedie3" } */
    {
      const gameConfigs = { gameId: 57, name: "minisedie3" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 58, name: "minisedie4" } */
    {
      const gameConfigs = { gameId: 58, name: "minisedie4" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 59, name: "fruitslot" } */
    {
      const gameConfigs = { gameId: 59, name: "fruitslot" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_betlogs" }, to: { db: "minigame_arc", postfix: "_betlogs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 60, name: "fantan" } */
    {
      const gameConfigs = { gameId: 60, name: "fantan" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_betlogs" }, to: { db: "minigame_arc", postfix: "_betlogs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 61, name: "winthreecards" } */
    {
      const gameConfigs = { gameId: 61, name: "winthreecards" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_betlogs" }, to: { db: "minigame_arc", postfix: "_betlogs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs,
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs,
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs,
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 62, name: "fortunecat" } // auto */
    /** { gameId: 63, name: "happyfish" } // auto */
    /** { gameId: 64, name: "magicforest" } // auto */
    /** { gameId: 65, name: "djclub" } // auto */
    /** { gameId: 66, name: "candyland" } // auto */

    /** { gameId: 67, name: "dragontigerfight" } */
    {
      const gameConfigs = { gameId: 67, name: "dragontigerfight" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "_rounds" },
          to: { db: "minigame_arc", postfix: "_rounds_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24, localField: "id" },
          childs: [
            { from: { db: "minigame", postfix: "_bets" }, to: { db: "minigame_arc", postfix: "_bets_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_betlogs" }, to: { db: "minigame_arc", postfix: "_betlogs_bk" }, config: { foreignField: "roundId" }, filter: '{"playerId":{"$gt":0}}' },
            { from: { db: "minigame", postfix: "_results" }, to: { db: "minigame_arc", postfix: "_results_bk" }, config: { foreignField: "roundId" } },
          ],
          log: { field: "_rounds", value: "id" },
        },
        {
          ...commonConfig,
          id: 1,
          gameConfigs: { gameId: 67, name: "dragontigerfight" },
          from: { db: "minigame", postfix: "_results" },
          to: { db: "minigame_arc", postfix: "_results_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
        },
        {
          ...commonConfig,
          id: 2,
          gameConfigs: { gameId: 67, name: "dragontigerfight" },
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 3,
          gameConfigs: { gameId: 67, name: "dragontigerfight" },
          from: { db: "minigame", postfix: "_bets" },
          to: { db: "minigame_arc", postfix: "_bets_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
        {
          ...commonConfig,
          id: 4,
          gameConfigs: { gameId: 67, name: "dragontigerfight" },
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8 },
          filter: '{"playerId":{"$gt":0}}',
        },
        {
          ...commonConfig,
          id: 5,
          gameConfigs: { gameId: 67, name: "dragontigerfight" },
          from: { db: "minigame", postfix: "_betlogs" },
          to: { db: "minigame_arc", postfix: "_betlogs_bk" },
          alias: { time: "time" },
          config: { cutOffsetHours: -24 * 8, updateOnly: true },
          filter: '{"playerId":null}',
        },
      ].forEach((config) => archiveConfigData.push(config));
    }

    /** { gameId: 68, name: "missionimpossible" } // auto */
    /** { gameId: 69, name: "blackpink" } // auto */

    /** { gameId: 99, name: "jackpots" } */
    {
      const gameConfigs = { gameId: 99, name: "jackpots" };
      [
        {
          ...commonConfig,
          id: 0,
          gameConfigs,
          from: { db: "minigame", postfix: "" },
          to: { db: "minigame_arc", postfix: "_bk" },
          alias: { time: "hitTime" },
          config: { cutOffsetHours: -24 },
        },
      ].forEach((config) => archiveConfigData.push(config));
    }
  }

  /** Summaries */
  {
    const commonConfig = { category: "summaries", type: 0 };

    [
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "sum", name: "round_summaries" },
        from: { db: "summary", postfix: "" },
        to: { db: "summary_arc", postfix: "_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24 * 8 },
      },
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "sum", name: "hourly_summaries" },
        from: { db: "summary", postfix: "" },
        to: { db: "summary_arc", postfix: "_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24 * 8 },
      },
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "sum", name: "daily_summaries" },
        from: { db: "summary", postfix: "" },
        to: { db: "summary_arc", postfix: "_bk" },
        alias: { time: "time" },
        config: { cutOffsetHours: -24 * 8 },
      },
    ].forEach((config) => archiveConfigData.push(config));
  }

  /** Users */
  {
    const commonConfig = { category: "user", type: 0 };

    [
      {
        ...commonConfig,
        id: 0,
        gameConfigs: { type: "user", name: "usersessions" },
        from: { db: "minigame", postfix: "" },
        to: { db: "minigame_arc", postfix: "_bk" },
        alias: { time: "recheckInTime" },
        config: { cutOffsetHours: -24 * 8 },
      },
    ].forEach((config) => archiveConfigData.push(config));
  }

  (global.___data = global.___data ?? {})[label] = archiveConfigData;
}
