/** @type { BsonDocument[] } */
const archiveGameConfigs = [];

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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
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
                from: { db: "minigame", postfix: "_ones" },
                to: { db: "minigame_arc", postfix: "_ones_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                childs: [
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
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
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                childs: [
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
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
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
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
                from: { db: "minigame", postfix: "_ones" },
                to: { db: "minigame_arc", postfix: "_ones_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
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
                from: { db: "minigame", postfix: "_ones" },
                to: { db: "minigame_arc", postfix: "_ones_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                childs: [
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
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
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
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
                from: { db: "minigame", postfix: "_ones" },
                to: { db: "minigame_arc", postfix: "_ones_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
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
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
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
                from: { db: "minigame", postfix: "_ones" },
                to: { db: "minigame_arc", postfix: "_ones_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
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
                from: { db: "minigame", postfix: "_ones" },
                to: { db: "minigame_arc", postfix: "_ones_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
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
                from: { db: "minigame", postfix: "_ones" },
                to: { db: "minigame_arc", postfix: "_ones_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
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
                from: { db: "minigame", postfix: "_ones" },
                to: { db: "minigame_arc", postfix: "_ones_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_cuocs" },
                        to: { db: "minigame_arc", postfix: "_cuocs_bk" },
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
                from: { db: "minigame", postfix: "_cuocs" },
                to: { db: "minigame_arc", postfix: "_cuocs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_betlogs" },
                        to: { db: "minigame_arc", postfix: "_betlogs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_bets" },
                        to: { db: "minigame_arc", postfix: "_bets_bk" },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_betlogs" },
                to: { db: "minigame_arc", postfix: "_betlogs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
    }

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
                childs: [
                    {
                        from: { db: "minigame", postfix: "_betlogs" },
                        to: { db: "minigame_arc", postfix: "_betlogs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                ],
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
    }

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
                    {
                        from: { db: "minigame", postfix: "_bets" },
                        to: { db: "minigame_arc", postfix: "_bets_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                ],
                log: { field: "_rounds", value: "id" },
                filterConfigs: {
                    __brand: "group",
                    lookupFrom: { postfix: "_results" },
                    pipeline: '[{"$match":{"isAvailable":true}},{"$limit":1},{"$project":{"_id":0,"id":"$firstRoundId"}}]',
                    filterExpr: '{"$expr":{"$lt":["$id",{"$ifNull":["$__f.id",{"$numberDouble":"Infinity"}]}]}}',
                },
            },
            {
                ...commonConfig,
                id: 1,
                gameConfigs,
                from: { db: "minigame", postfix: "_results" },
                to: { db: "minigame_arc", postfix: "_results_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 },
                filter: '{"isAvailable":false}',
                filterConfigs: { __brand: "internal", filterExpr: '{"isAvailable":false}' },
            },
            {
                ...commonConfig,
                id: 2,
                gameConfigs,
                from: { db: "minigame", postfix: "_bets" },
                to: { db: "minigame_arc", postfix: "_bets_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: {
                    __brand: "group",
                    lookupFrom: { postfix: "_results" },
                    pipeline: '[{"$match":{"isAvailable":true}},{"$limit":1},{"$project":{"_id":0,"id":"$firstRoundId"}}]',
                    filterExpr: '{"playerId":{"$ne":null},"$expr":{"$lt":["$roundId",{"$ifNull":["$__f.id",{"$numberDouble":"Infinity"}]}]}}',
                },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_bets" },
                        to: { db: "minigame_arc", postfix: "_bets_bk" },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_bets" },
                to: { db: "minigame_arc", postfix: "_bets_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
                    {
                        from: { db: "minigame", postfix: "_ones" },
                        to: { db: "minigame_arc", postfix: "_ones_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_bets" },
                        to: { db: "minigame_arc", postfix: "_bets_bk" },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_bets" },
                to: { db: "minigame_arc", postfix: "_bets_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
                    {
                        from: { db: "minigame", postfix: "_bets" },
                        to: { db: "minigame_arc", postfix: "_bets_bk" },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
                    {
                        from: { db: "minigame", postfix: "_bets" },
                        to: { db: "minigame_arc", postfix: "_bets_bk" },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
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
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
                    {
                        from: { db: "minigame", postfix: "_bets" },
                        to: { db: "minigame_arc", postfix: "_bets_bk" },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
    }

    /** { gameId: 71, name: "colorgame" } */
    {
        const gameConfigs = { gameId: 71, name: "colorgame" };
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
                    {
                        from: { db: "minigame", postfix: "_bets" },
                        to: { db: "minigame_arc", postfix: "_bets_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_betlogs" },
                        to: { db: "minigame_arc", postfix: "_betlogs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_betlogs" },
                to: { db: "minigame_arc", postfix: "_betlogs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
    }

    /** { gameId: 72, name: "pontoon" } */
    {
        const gameConfigs = { gameId: 72, name: "pontoon" };
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
                    {
                        from: { db: "minigame", postfix: "_bets" },
                        to: { db: "minigame_arc", postfix: "_bets_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                        log: { field: "_bets", value: "id" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                log: { field: "_bets", value: "id" },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
    }

    /** { gameId: 77, name: "chineseblackjack" } */
    {
        const gameConfigs = { gameId: 77, name: "chineseblackjack" };
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
                    {
                        from: { db: "minigame", postfix: "_bets" },
                        to: { db: "minigame_arc", postfix: "_bets_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                        log: { field: "_bets", value: "id" },
                    },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                log: { field: "_bets", value: "id" },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
    }

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
        ].forEach((config) => archiveGameConfigs.push(config));
    }

    [
        { gameId: 50, name: "unbalancedbigsmall1" },
        { gameId: 51, name: "unbalancedbigsmall2" },
        { gameId: 54, name: "unbalancedbigsmall3" },
        { gameId: 55, name: "unbalancedbigsmall4" },
        { gameId: 60, name: "fantan" },
        { gameId: 61, name: "winthreecards" },
        { gameId: 67, name: "dragontigerfight" },
        { gameId: 75, name: "bandarqiuqiu" },
        { gameId: 78, name: "footballdice" },
        { gameId: 80, name: "cointoss" },
        { gameId: 93, name: "footballcointoss" },
        { gameId: 95, name: "sedie3" },
        { gameId: 96, name: "karakrus" },
        { gameId: 103, name: "sevenupdown" },
    ].forEach((gameConfigs) => {
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
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
                    {
                        from: { db: "minigame", postfix: "_bets" },
                        to: { db: "minigame_arc", postfix: "_bets_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_betlogs" },
                        to: { db: "minigame_arc", postfix: "_betlogs_bk" },
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
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_betlogs" },
                to: { db: "minigame_arc", postfix: "_betlogs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
    });

    [
        { gameId: 81, name: "bac81" },
        { gameId: 82, name: "bac82" },
        { gameId: 83, name: "bac83" },
        { gameId: 84, name: "bac84" },
        { gameId: 85, name: "bac85" },
        { gameId: 86, name: "bac86" },
        { gameId: 87, name: "bac87" },
        { gameId: 88, name: "bac88" },
        { gameId: 89, name: "bac89" },
        { gameId: 90, name: "bac90" },
        { gameId: 91, name: "bac91" },
        { gameId: 92, name: "bac92" },
        { gameId: 97, name: "bac98" },
        { gameId: 98, name: "bac98" },
        { gameId: 100, name: "bac100" },
        { gameId: 101, name: "bac101" },
    ].forEach((gameConfigs) => {
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
                    {
                        from: { db: "minigame", postfix: "_results" },
                        to: { db: "minigame_arc", postfix: "_results_bk" },
                        config: { foreignField: "roundId" },
                    },
                    {
                        from: { db: "minigame", postfix: "_bets" },
                        to: { db: "minigame_arc", postfix: "_bets_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_betlogs" },
                        to: { db: "minigame_arc", postfix: "_betlogs_bk" },
                        config: { foreignField: "roundId" },
                        filter: '{"playerId":{"$ne":null}}',
                        filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    },
                    {
                        from: { db: "minigame", postfix: "_multipliers" },
                        to: { db: "minigame_arc", postfix: "_multipliers_bk" },
                        config: { foreignField: "roundId" },
                    },
                    {
                        from: { db: "minigame", postfix: "_cut_card_pfs" },
                        to: { db: "minigame_arc", postfix: "_cut_card_pfs_bk" },
                        config: { foreignField: "roundId" },
                    },
                ],
                filterConfigs: {
                    __brand: "group",
                    lookupFrom: { postfix: "_results" },
                    pipeline: '[{"$match":{"isAvailable":true}},{"$limit":1},{"$project":{"_id":0,"id":"$firstRoundId"}}]',
                    filterExpr: '{"$expr":{"$lt":["$id",{"$ifNull":["$__f.id",{"$numberDouble":"Infinity"}]}]}}',
                },
                log: { field: "_rounds", value: "id" },
            },
            {
                ...commonConfig,
                id: 1,
                gameConfigs,
                from: { db: "minigame", postfix: "_results" },
                to: { db: "minigame_arc", postfix: "_results_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 },
                filterConfigs: { __brand: "internal", filterExpr: '{"isAvailable":false}' },
            },
            {
                ...commonConfig,
                id: 2,
                gameConfigs,
                from: { db: "minigame", postfix: "_bets" },
                to: { db: "minigame_arc", postfix: "_bets_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: {
                    __brand: "group",
                    lookupFrom: { postfix: "_results" },
                    pipeline: '[{"$match":{"isAvailable":true}},{"$limit":1},{"$project":{"_id":0,"id":"$firstRoundId"}}]',
                    filterExpr: '{"playerId":{"$ne":null},"$expr":{"$lt":["$roundId",{"$ifNull":["$__f.id",{"$numberDouble":"Infinity"}]}]}}',
                },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 4,
                gameConfigs,
                from: { db: "minigame", postfix: "_betlogs" },
                to: { db: "minigame_arc", postfix: "_betlogs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filter: '{"playerId":{"$ne":null}}',
                filterConfigs: {
                    __brand: "group",
                    lookupFrom: { postfix: "_results" },
                    pipeline: '[{"$match":{"isAvailable":true}},{"$limit":1},{"$project":{"_id":0,"id":"$firstRoundId"}}]',
                    filterExpr: '{"playerId":{"$ne":null},"$expr":{"$lt":["$roundId",{"$ifNull":["$__f.id",{"$numberDouble":"Infinity"}]}]}}',
                },
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
                filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
            },
            {
                ...commonConfig,
                id: 6,
                gameConfigs,
                from: { db: "minigame", postfix: "_multipliers" },
                to: { db: "minigame_arc", postfix: "_multipliers_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filterConfigs: {
                    __brand: "group",
                    lookupFrom: { postfix: "_results" },
                    pipeline: '[{"$match":{"isAvailable":true}},{"$limit":1},{"$project":{"_id":0,"id":"$firstRoundId"}}]',
                    filterExpr: '{"$expr":{"$lt":["$roundId",{"$ifNull":["$__f.id",{"$numberDouble":"Infinity"}]}]}}',
                },
            },
            {
                ...commonConfig,
                id: 7,
                gameConfigs,
                from: { db: "minigame", postfix: "_cut_card_pfs" },
                to: { db: "minigame_arc", postfix: "_cut_card_pfs_bk" },
                alias: { time: "time" },
                config: { cutOffsetHours: -24 * 8 },
                filterConfigs: {
                    __brand: "group",
                    lookupFrom: { postfix: "_results" },
                    pipeline: '[{"$match":{"isAvailable":true}},{"$limit":1},{"$project":{"_id":0,"id":"$firstRoundId"}}]',
                    filterExpr: '{"$expr":{"$lt":["$roundId",{"$ifNull":["$__f.id",{"$numberDouble":"Infinity"}]}]}}',
                },
            },
        ].forEach((config) => archiveGameConfigs.push(config));
    });
}

module.exports = { archiveGameConfigs };
