// @ts-check
(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    /** @type { BsonDocument[] } */
    const archiveConfigs = [];

    /** Logs */
    {
        const commonConfig = { category: "logs", type: 0 };

        [
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_log", name: "audit_events" },
                from: { db: "hotdog_log", postfix: "" },
                to: { db: "hotdog_log_arc", postfix: "_bk" },
                alias: { time: "StartDate" },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_log", name: "bet_limits" },
                from: { db: "hotdog_log", postfix: "" },
                to: { db: "hotdog_log_arc", postfix: "_bk" },
                alias: { time: "logTimeStamp" },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_log", name: "bets" },
                from: { db: "hotdog_log", postfix: "" },
                to: { db: "hotdog_log_arc", postfix: "_bk" },
                alias: { time: "logTimeStamp" },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_log", name: "end_games" },
                from: { db: "hotdog_log", postfix: "" },
                to: { db: "hotdog_log_arc", postfix: "_bk" },
                alias: { time: "logTimeStamp" },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_log", name: "enter_portals" },
                from: { db: "hotdog_log", postfix: "" },
                to: { db: "hotdog_log_arc", postfix: "_bk" },
                alias: { time: "logTimeStamp" },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_log", name: "failed_requests" },
                from: { db: "hotdog_log", postfix: "" },
                to: { db: "hotdog_log_arc", postfix: "_bk" },
                alias: { time: "logTimeStamp" },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_log", name: "hit_jackpots" },
                from: { db: "hotdog_log", postfix: "" },
                to: { db: "hotdog_log_arc", postfix: "_bk" },
                alias: { time: "logTimeStamp" },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_log", name: "membersignin_requests" },
                from: { db: "hotdog_log", postfix: "" },
                to: { db: "hotdog_log_arc", postfix: "_bk" },
                alias: { time: "logTimeStamp" },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_log", name: "owsignin_requests" },
                from: { db: "hotdog_log", postfix: "" },
                to: { db: "hotdog_log_arc", postfix: "_bk" },
                alias: { time: "logTimeStamp" },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_log", name: "retrieve_requests" },
                from: { db: "hotdog_log", postfix: "" },
                to: { db: "hotdog_log_arc", postfix: "_bk" },
                alias: { time: "logTimeStamp" },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_log", name: "signin_requests" },
                from: { db: "hotdog_log", postfix: "" },
                to: { db: "hotdog_log_arc", postfix: "_bk" },
                alias: { time: "logTimeStamp" },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_log", name: "ticket_detail_requests" },
                from: { db: "hotdog_log", postfix: "" },
                to: { db: "hotdog_log_arc", postfix: "_bk" },
                alias: { time: "logTimeStamp" },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_log", name: "void_games" },
                from: { db: "hotdog_log", postfix: "" },
                to: { db: "hotdog_log_arc", postfix: "_bk" },
                alias: { time: "logTimeStamp" },
            },
        ].forEach((config) => archiveConfigs.push(config));
    }

    /** Member */
    {
        const commonConfig = { category: "member", type: 0 };

        [
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_member", name: "member_auths" },
                from: { db: "hotdog_member", postfix: "" },
                to: { db: "hotdog_member_arc", postfix: "_bk" },
                alias: { time: "time" },
            },
        ].forEach((config) => archiveConfigs.push(config));
    }

    /** Summaries */
    {
        const commonConfig = { category: "summaries", type: 0 };

        [
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_summary", name: "round_summaries" },
                from: { db: "hotdog_summary", postfix: "" },
                to: { db: "hotdog_summary_arc", postfix: "_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 3 },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_summary", name: "hourly_summaries" },
                from: { db: "hotdog_summary", postfix: "" },
                to: { db: "hotdog_summary_arc", postfix: "_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 3 },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_summary", name: "daily_summaries" },
                from: { db: "hotdog_summary", postfix: "" },
                to: { db: "hotdog_summary_arc", postfix: "_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 3 },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_summary", name: "hourly_statements" },
                from: { db: "hotdog_summary", postfix: "" },
                to: { db: "hotdog_summary_arc", postfix: "_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 3 },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_summary", name: "daily_statements" },
                from: { db: "hotdog_summary", postfix: "" },
                to: { db: "hotdog_summary_arc", postfix: "_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 3 },
            },
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_summary", name: "ticket_silos" },
                from: { db: "hotdog_minigame", postfix: "" },
                to: { db: "hotdog_minigame_arc", postfix: "_bk" },
                alias: { time: "roundTime" },
                config: { cutOffsetHours: -24 * 3 },
            },
        ].forEach((config) => archiveConfigs.push(config));
    }

    /** Users */
    {
        const commonConfig = { category: "user", type: 0 };

        [
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_user", name: "usersessions" },
                from: { db: "hotdog_minigame", postfix: "" },
                to: { db: "hotdog_minigame_arc", postfix: "_bk" },
                alias: { time: "recheckInTime" },
            },
        ].forEach((config) => archiveConfigs.push(config));
    }

    /** Misc */
    {
        const commonConfig = { category: "misc", type: 0 };

        [
            {
                ...commonConfig,
                id: 0,
                gameConfigs: { type: "hotdog_misc", name: "notification_service_events" },
                from: { db: "hotdog_minigame", postfix: "" },
                to: { db: "hotdog_minigame_arc", postfix: "_bk" },
                alias: { time: "_id" },
                config: { updateOnly: true },
            },
            {
                ...commonConfig,
                id: 1,
                gameConfigs: { type: "hotdog_misc", name: "ticket_importer_last_processed" },
                from: { db: "hotdog_minigame", postfix: "" },
                to: { db: "hotdog_minigame_arc", postfix: "_bk" },
                alias: { time: "_id" },
            },
            {
                ...commonConfig,
                id: 1,
                gameConfigs: { type: "hotdog_misc", name: "import_requests" },
                from: { db: "hotdog_minigame", postfix: "" },
                to: { db: "hotdog_minigame_arc", postfix: "_bk" },
                alias: { time: "_id" },
            },
        ].forEach((config) => archiveConfigs.push(config));
    }

    /** @type { BsonDocument[] } */
    const archiveGameConfigs = [];

    /** Games */
    {
        const commonConfig = { category: "games", type: 0 };

        [
            { gameId: 2, name: "xocxoc" },
            { gameId: 10, name: "baccarat" },
            { gameId: 22, name: "vipsedie" },
        ].forEach((gameConfigs) => {
            [
                {
                    ...commonConfig,
                    id: 0,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_phiens" },
                    to: { db: "hotdog_minigame_arc", postfix: "_phiens_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24, localField: "id" },
                    childs: [
                        {
                            from: { db: "hotdog_minigame", postfix: "_cuocs" },
                            to: { db: "hotdog_minigame_arc", postfix: "_cuocs_bk" },
                            config: { foreignField: "roundId" },
                            filter: '{"playerId":{"$ne":null}}',
                            filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                        },
                        {
                            from: { db: "hotdog_minigame", postfix: "_results" },
                            to: { db: "hotdog_minigame_arc", postfix: "_results_bk" },
                            config: { foreignField: "roundId" },
                        },
                    ],
                    log: { field: "_phiens", value: "id" },
                },
                {
                    ...commonConfig,
                    id: 1,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_results" },
                    to: { db: "hotdog_minigame_arc", postfix: "_results_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                },
                {
                    ...commonConfig,
                    id: 2,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_cuocs" },
                    to: { db: "hotdog_minigame_arc", postfix: "_cuocs_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                    filter: '{"playerId":{"$ne":null}}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                },
                {
                    ...commonConfig,
                    id: 3,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_cuocs" },
                    to: { db: "hotdog_minigame_arc", postfix: "_cuocs_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8, updateOnly: true },
                    filter: '{"playerId":null}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
                },
            ].forEach((config) => archiveGameConfigs.push(config));
        });

        [
            { gameId: 25, name: "sicbo" }, // -
        ].forEach((gameConfigs) => {
            [
                {
                    ...commonConfig,
                    id: 0,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_phiens" },
                    to: { db: "hotdog_minigame_arc", postfix: "_phiens_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24, localField: "id" },
                    childs: [
                        {
                            from: { db: "hotdog_minigame", postfix: "_cuocs" },
                            to: { db: "hotdog_minigame_arc", postfix: "_cuocs_bk" },
                            config: { foreignField: "roundId" },
                            filter: '{"playerId":{"$ne":null}}',
                            filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                        },
                        {
                            from: { db: "hotdog_minigame", postfix: "_ones" },
                            to: { db: "hotdog_minigame_arc", postfix: "_ones_bk" },
                            config: { foreignField: "roundId" },
                            filter: '{"playerId":{"$ne":null}}',
                            filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                        },
                        {
                            from: { db: "hotdog_minigame", postfix: "_results" },
                            to: { db: "hotdog_minigame_arc", postfix: "_results_bk" },
                            config: { foreignField: "roundId" },
                        },
                    ],
                    log: { field: "_phiens", value: "id" },
                },
                {
                    ...commonConfig,
                    id: 1,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_results" },
                    to: { db: "hotdog_minigame_arc", postfix: "_results_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                },
                {
                    ...commonConfig,
                    id: 2,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_ones" },
                    to: { db: "hotdog_minigame_arc", postfix: "_ones_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                    filter: '{"playerId":{"$ne":null}}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                },
                {
                    ...commonConfig,
                    id: 3,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_ones" },
                    to: { db: "hotdog_minigame_arc", postfix: "_ones_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8, updateOnly: true },
                    filter: '{"playerId":null}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
                },
                {
                    ...commonConfig,
                    id: 4,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_cuocs" },
                    to: { db: "hotdog_minigame_arc", postfix: "_cuocs_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                    filter: '{"playerId":{"$ne":null}}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                },
                {
                    ...commonConfig,
                    id: 5,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_cuocs" },
                    to: { db: "hotdog_minigame_arc", postfix: "_cuocs_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8, updateOnly: true },
                    filter: '{"playerId":null}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
                },
            ].forEach((config) => archiveGameConfigs.push(config));
        });

        [
            { gameId: 26, name: "vipfishprawncrab" }, // -
        ].forEach((gameConfigs) => {
            [
                {
                    ...commonConfig,
                    id: 0,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_phiens" },
                    to: { db: "hotdog_minigame_arc", postfix: "_phiens_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24, localField: "id" },
                    childs: [
                        {
                            from: { db: "hotdog_minigame", postfix: "_cuocs" },
                            to: { db: "hotdog_minigame_arc", postfix: "_cuocs_bk" },
                            config: { foreignField: "roundId" },
                            filter: '{"playerId":{"$ne":null}}',
                            filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                        },
                    ],
                    log: { field: "_phiens", value: "id" },
                },
                {
                    ...commonConfig,
                    id: 2,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_cuocs" },
                    to: { db: "hotdog_minigame_arc", postfix: "_cuocs_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                    filter: '{"playerId":{"$ne":null}}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                },
                {
                    ...commonConfig,
                    id: 3,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_cuocs" },
                    to: { db: "hotdog_minigame_arc", postfix: "_cuocs_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8, updateOnly: true },
                    filter: '{"playerId":null}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
                },
            ].forEach((config) => archiveGameConfigs.push(config));
        });

        [
            { gameId: 55, name: "unbalancedbigsmall4" },
            { gameId: 67, name: "dragontigerfight" },
            { gameId: 80, name: "cointoss" },
            { gameId: 93, name: "footballcointoss" },
            { gameId: 1005, name: "seball1" },
            { gameId: 1007, name: "sicball" },
        ].forEach((gameConfigs) => {
            [
                {
                    ...commonConfig,
                    id: 0,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_rounds" },
                    to: { db: "hotdog_minigame_arc", postfix: "_rounds_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24, localField: "id" },
                    childs: [
                        {
                            from: { db: "hotdog_minigame", postfix: "_results" },
                            to: { db: "hotdog_minigame_arc", postfix: "_results_bk" },
                            config: { foreignField: "roundId" },
                        },
                        {
                            from: { db: "hotdog_minigame", postfix: "_bets" },
                            to: { db: "hotdog_minigame_arc", postfix: "_bets_bk" },
                            config: { foreignField: "roundId" },
                            filter: '{"playerId":{"$ne":null}}',
                            filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                        },
                        {
                            from: { db: "hotdog_minigame", postfix: "_betlogs" },
                            to: { db: "hotdog_minigame_arc", postfix: "_betlogs_bk" },
                            config: { foreignField: "roundId" },
                            filter: '{"playerId":{"$ne":null}}',
                            filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                        },
                    ],
                    log: { field: "_rounds", value: "id" },
                },
                {
                    ...commonConfig,
                    id: 1,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_results" },
                    to: { db: "hotdog_minigame_arc", postfix: "_results_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                },
                {
                    ...commonConfig,
                    id: 2,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_bets" },
                    to: { db: "hotdog_minigame_arc", postfix: "_bets_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                    filter: '{"playerId":{"$ne":null}}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                },
                {
                    ...commonConfig,
                    id: 3,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_bets" },
                    to: { db: "hotdog_minigame_arc", postfix: "_bets_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8, updateOnly: true },
                    filter: '{"playerId":null}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
                },
                {
                    ...commonConfig,
                    id: 4,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_betlogs" },
                    to: { db: "hotdog_minigame_arc", postfix: "_betlogs_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                    filter: '{"playerId":{"$ne":null}}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                },
                {
                    ...commonConfig,
                    id: 5,
                    gameConfigs,
                    from: { db: "hotdog_minigame", postfix: "_betlogs" },
                    to: { db: "hotdog_minigame_arc", postfix: "_betlogs_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8, updateOnly: true },
                    filter: '{"playerId":null}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
                },
            ].forEach((config) => archiveGameConfigs.push(config));
        });
    }

    /** @type { AnyBulkWriteOperation[] } */
    const bulkWrite = [...archiveConfigs, ...archiveGameConfigs].map((doc) => {
        const { gameConfigs, id } = doc;
        const data = Object.assign({}, { _id: { gameConfigs, id } }, doc);

        return {
            replaceOne: {
                filter: { gameConfigs, id },
                replacement: data,
                upsert: true,
            },
        };
    });

    const opsDB = db.getSiblingDB("hotdog_ops_configs");
    {
        const res = await opsDB.getCollection("archive_configs").bulkWrite(bulkWrite, { ordered: false });
        log("I", "DATA", `[${opsDB.getName()}.archive_configs]`, `• ${stringifyResult(res)}`);
    }
})();
