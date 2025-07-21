// @ts-check

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    game_jackpotConfig: {
        key: { gameId: 1, jackpotConfigId: 1 },
        options: {},
    },
    game_jackpotConfig_U: {
        key: { gameId: 1, jackpotConfigId: 1 },
        options: { unique: true },
    },
    game_jackpotConfig_hitTime: {
        key: { gameId: 1, jackpotConfigId: 1, hitTime: 1 },
        options: {},
    },
    game_operator_sites_U: {
        key: { gameId: 1, operatorId: 1, siteNames: 1 },
        options: { unique: true },
    },
    game_pool_created_FU: {
        key: { gameId: 1, pool: 1, createdAt: 1 },
        options: {
            unique: true,
            partialFilterExpression: { pool: { $gt: 0 } },
        },
    },
    game_pool_FU: {
        key: { gameId: 1, pool: 1 },
        options: {
            unique: true,
            partialFilterExpression: {
                hitAt: null,
                pool: { $gt: 0 },
                gameId: { $gt: 29 },
            },
        },
    },
    game_prize_created_FU: {
        key: { gameId: 1, prize: 1, createdAt: 1 },
        options: {
            unique: true,
            partialFilterExpression: { prize: { $gt: "" } },
        },
    },
    game_prize_FU: {
        key: { gameId: 1, prize: 1 },
        options: {
            unique: true,
            partialFilterExpression: {
                hitAt: null,
                prize: { $gt: "" },
            },
        },
    },
});

module.exports = indexes;
