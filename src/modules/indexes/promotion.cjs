// @ts-check

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    code_U: {
        key: { code: 1 },
        options: { unique: true },
    },
    dataSourceTimeStamp: {
        key: { dataSourceTimeStamp: 1 },
        options: {},
    },
    game_status: {
        key: { gameId: 1, status: 1 },
        options: {},
    },
    operator_player_game_round_U: {
        key: { operatorId: 1, playerId: 1, gameId: 1, roundId: 1 },
        options: { unique: true },
    },
    operator_player_promoCode_FU: {
        key: { operatorId: 1, playerId: 1, promotionCode: 1 },
        options: { unique: true, partialFilterExpression: { $or: [{ isCompleted: false }, { isCompleted: null }] } },
    },
    playerPromotionId_U: {
        key: { playerPromotionId: 1 },
        options: { unique: true },
    },
    promo_operator_player_U: {
        key: { promotionId: 1, operatorId: 1, playerId: 1 },
        options: { unique: true },
    },
    promo_U: {
        key: { promotionId: 1 },
        options: { unique: true },
    },
});

module.exports = indexes;
