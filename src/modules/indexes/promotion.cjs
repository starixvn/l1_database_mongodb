/** @satisfies { IndexConfig } */
const indexes = {
    promo_U: {
        key: { promotionId: 1 },
        options: { unique: true },
    },
    operator_player_game_round_U: {
        key: { operatorId: 1, playerId: 1, gameId: 1, roundId: 1 },
        options: { unique: true },
    },
    dataSourceTimeStamp: {
        key: { dataSourceTimeStamp: 1 },
        options: {},
    },
    promo_operator_player_U: {
        key: { promotionId: 1, operatorId: 1, playerId: 1 },
        options: { unique: true },
    },
};

module.exports = indexes;
