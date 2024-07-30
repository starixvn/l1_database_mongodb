module.exports = {
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
    roundTime: {
        key: { roundTime: 1 },
        options: {},
    },
};
