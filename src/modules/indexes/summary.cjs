/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    flag_do_daily_F: {
        key: { "__archive.do_daily": 1 },
        options: { partialFilterExpression: { "__archive.do_daily": true } },
    },
    flag_daily: {
        key: { "__archive.daily": 1 },
        options: {},
    },
    flag_do_hourly_F: {
        key: { "__archive.do_hourly": 1 },
        options: { partialFilterExpression: { "__archive.do_hourly": true } },
    },
    flag_hourly: {
        key: { "__archive.hourly": 1 },
        options: {},
    },
    game_U: {
        key: { gameId: 1 },
        options: { unique: true },
    },
    game_currency_operator_site_round: {
        key: { gameId: 1, currency: 1, operatorId: 1, siteId: 1, roundId: 1 },
        options: {},
    },
    game_currency_operator_site_round_U: {
        key: { gameId: 1, currency: 1, operatorId: 1, siteId: 1, roundId: 1 },
        options: { unique: true },
    },
    game_system_time: {
        key: { gameId: 1, system: 1, time: 1 },
        options: {},
    },
    owGameTypeId_FU: {
        key: { owGameTypeId: 1 },
        options: { unique: true, partialFilterExpression: { owGameTypeId: { $gt: 0 } } },
    },
    time_TTL_8d: {
        key: { time: 1 },
        options: { expireAfterSeconds: 8 * 24 * 3_600 },
    },
    time_currency_game_operator_site: {
        key: { time: 1, currency: 1, gameId: 1, operatorId: 1, siteId: 1 },
        options: {},
    },
    time_currency_game_operator_site_U: {
        key: { time: 1, currency: 1, gameId: 1, operatorId: 1, siteId: 1 },
        options: { unique: true },
    },
    time_currency_game_system_operator: {
        key: { time: 1, currency: 1, gameId: 1, system: 1, operatorId: 1 },
        options: {},
    },
    time_currency_game_system_operator_U: {
        key: { time: 1, currency: 1, gameId: 1, system: 1, operatorId: 1 },
        options: { unique: true },
    },
    time_game_operator_site_player: {
        key: { time: 1, gameId: 1, operatorId: 1, siteId: 1, playerId: 1 },
        options: {},
    },
    time_game_operator_site_player_U: {
        key: { time: 1, gameId: 1, operatorId: 1, siteId: 1, playerId: 1 },
        options: { unique: true },
    },
});

module.exports = indexes;
