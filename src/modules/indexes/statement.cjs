module.exports = {
    gameId_round_subRound_operator_player_U: {
        key: { gameId: 1, roundId: 1, subRoundId: 1, operatorId: 1, playerId: 1 },
        options: { unique: true },
    },
    time: {
        key: { time: 1 },
        options: {},
    },
    roundTime: {
        key: { roundTime: 1 },
        options: {},
    },
    __archive_summarized: {
        key: { "__archive.summarized": 1 },
        options: {},
    },
    __archive_do_summary: {
        key: { "__archive.do_summary": 1 },
        options: { partialFilterExpression: { "__archive.do_summary": true } },
    },
    __archive_daily: {
        key: { "__archive.daily": 1, "__archive.inserted": 1 },
        options: {},
    },
    __archive_do_daily: {
        key: { "__archive.do_daily": 1 },
        options: { partialFilterExpression: { "__archive.do_daily": true } },
    },
    __archive_hourly: {
        key: { "__archive.hourly": 1, "__archive.inserted": 1 },
        options: {},
    },
    __archive_do_hourly: {
        key: { "__archive.do_hourly": 1 },
        options: { partialFilterExpression: { "__archive.do_hourly": true } },
    },
};
