/** @satisfies {import("../type.cjs").IndexConfig} */
const indexes = {
    game_round_subRound_operator_player_U: {
        key: { gameId: 1, roundId: 1, subRoundId: 1, operatorId: 1, playerId: 1 },
        options: { unique: true },
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
};

module.exports = indexes;
