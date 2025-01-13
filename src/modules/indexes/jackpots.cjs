// @ts-check

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
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
