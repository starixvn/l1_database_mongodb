// @ts-check

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    game_round_subRound_operator_player: {
        key: { gameId: 1, roundId: 1, subRoundId: 1, operatorId: 1, playerId: 1 },
        options: {},
    },
    game_player_time: {
        key: { gameId: 1, playerId: 1, time: 1 },
        options: {},
    },
    time: {
        key: { time: 1 },
        options: {},
    },
    game_roundTime: {
        key: { gameId: 1, roundTime: 1 },
        options: {},
    },
    time_code_U: {
        key: { time: 1, code: 1 },
        options: { unique: true },
    },
    player_operator: {
        key: { playerId: 1, operatorId: 1 },
        options: {},
    },
});

module.exports = indexes;
