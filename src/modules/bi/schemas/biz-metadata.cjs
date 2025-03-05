// @ts-check
const { date, filter, float, int64, str, oid, bool } = require("../data-types.cjs");
const { arrToJSON, objToJSON } = require("../ultilities.cjs");

/** @type { BITable[] } */
const bizMetadataTables = [
    {
        _id: { db: "minigame", table: "archive_statuses" },
        pipeline: JSON.stringify([
            {
                $project: {
                    _id: 0,
                    name: 1,
                    rounds: { $ifNull: ["$lastArcId._rounds", "$lastArcId._phiens", null] },
                    bets: { $ifNull: ["$lastArcId._cuocs", null] },
                    freespins: { $ifNull: ["$lastArcId._freespins", null] },
                },
            },
        ]),
        columns: [
            { mongo_name: "name", sql_name: "name", ...str },
            { mongo_name: "rounds", sql_name: "rounds", ...int64 },
            { mongo_name: "bets", sql_name: "bets", ...int64 },
            { mongo_name: "freespins", sql_name: "freespins", ...int64 },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "chips" },
        columns: [
            { mongo_name: "color", sql_name: "color", ...str },
            { mongo_name: "text", sql_name: "text", ...str },
            { mongo_name: "value", sql_name: "value", ...int64 },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "currencies" },
        columns: [
            { mongo_name: "code", sql_name: "code", ...str },
            { mongo_name: "name", sql_name: "name", ...str },
            { mongo_name: "multiplier", sql_name: "multiplier", ...float },
            { mongo_name: "partnerId", sql_name: "operatorId", ...str },
            { mongo_name: "groupId", sql_name: "groupId", ...oid },
            { mongo_name: "enabled", sql_name: "enabled", ...bool },
            { mongo_name: "isTest", sql_name: "isTest", ...bool },
            { mongo_name: "isUncountOnTotal", sql_name: "isUncountOnTotal", ...bool },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "currency_group_games" },
        pipeline: JSON.stringify([
            {
                $set: {
                    maxBetPerChoices: objToJSON("$maxBetPerChoices"),
                    chips: arrToJSON("$chips"),
                    stakeLevels: arrToJSON("$stakeLevels", 2),
                    coinValues: arrToJSON("$coinValues"),
                    betLevels: arrToJSON("$betLevels"),
                },
            },
        ]),
        columns: [
            { mongo_name: "groupId", sql_name: "groupId", ...oid },
            { mongo_name: "gameId", sql_name: "gameId", ...int64 },
            { mongo_name: "gameName", sql_name: "gameName", ...str },
            { mongo_name: "enabled", sql_name: "enabled", ...bool },
            { mongo_name: "chips", sql_name: "chips", ...str },
            { mongo_name: "minBet", sql_name: "minBet", ...float },
            { mongo_name: "maxBet", sql_name: "maxBet", ...float },
            { mongo_name: "maxBetPerChoices", sql_name: "maxBetPerChoices", ...str },
            { mongo_name: "maxWinPerRound", sql_name: "maxWinPerRound", ...float },
            { mongo_name: "stakeLevels", sql_name: "stakeLevels", ...str },
            { mongo_name: "coinValues", sql_name: "coinValues", ...str },
            { mongo_name: "defaultCoinValue", sql_name: "defaultCoinValue", ...float },
            { mongo_name: "betLevels", sql_name: "betLevels", ...str },
            { mongo_name: "defaultBetLevel", sql_name: "defaultBetLevel", ...float },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "currency_groups" },
        columns: [
            { mongo_name: "_id", sql_name: "groupId", ...oid },
            { mongo_name: "name", sql_name: "name", ...str },
            { mongo_name: "partnerId", sql_name: "operatorId", ...str },
            { mongo_name: "enabled", sql_name: "enabled", ...bool },
            { mongo_name: "fractionalOddsFormat", sql_name: "fractionalOddsFormat", ...bool },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "exchange_rates" },
        pipeline: JSON.stringify([{ $set: { code: { $objectToArray: "$code" } } }, { $unwind: "$code" }, { $set: { code: "$code.k", rate: "$code.v" } }]),
        columns: [
            { mongo_name: "time", sql_name: "time", ...date },
            { mongo_name: "exDate", sql_name: "exDate", ...date },
            { mongo_name: "exId", sql_name: "exId", ...int64 },
            { mongo_name: "source", sql_name: "source", ...str },
            { mongo_name: "code", sql_name: "code", ...str },
            { mongo_name: "rate", sql_name: "rate", ...float },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "game_configs" },
        pipeline: JSON.stringify([
            {
                $project: {
                    _id: 0,
                    name: 1,
                    gameId: 1,
                    type: 1,
                    enabled: 1,
                    botenabled: 1,
                    enableFreeBet: 1,
                    hour_maxbot: arrToJSON("$hour_maxbot"),
                },
            },
        ]),
        columns: [
            { mongo_name: "name", sql_name: "name", ...str },
            { mongo_name: "gameId", sql_name: "gameId", ...int64 },
            { mongo_name: "type", sql_name: "type", ...int64 },
            { mongo_name: "enabled", sql_name: "enabled", ...bool },
            { mongo_name: "botenabled", sql_name: "botEnabled", ...bool },
            { mongo_name: "enableFreeBet", sql_name: "enableFreeBet", ...bool },
            { mongo_name: "hour_maxbot", sql_name: "hourMaxBot", ...str },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "exchange_codes" },
        source: "global_configs",
        pipeline: JSON.stringify([{ $match: { type: `exchange_codes` } }, { $unwind: `$configs.codes` }, { $project: { _id: 0, time: 1, base: 1, codes: `$configs.codes` } }]),
        columns: [
            { mongo_name: "time", sql_name: "time", ...date },
            { mongo_name: "base", sql_name: "base", ...str },
            { mongo_name: "codes", sql_name: "name", ...str },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "lobbies" },
        pipeline: JSON.stringify([
            {
                $set: {
                    banners: arrToJSON("$banners", 2),
                    categories: arrToJSON("$categories", 4),
                    currencyGroupIds: arrToJSON("$currencyGroupIds"),
                    miniPanelGameIds: arrToJSON("$miniPanelGameIds"),
                },
            },
        ]),
        columns: [
            { mongo_name: "name", sql_name: "name", ...str },
            { mongo_name: "time", sql_name: "time", ...date },
            { mongo_name: "banners", sql_name: "banners", ...str },
            { mongo_name: "categories", sql_name: "categories", ...str },
            { mongo_name: "currencyGroupIds", sql_name: "currencyGroupIds", ...str },
            { mongo_name: "miniPanelGameIds", sql_name: "miniPanelGameIds", ...str },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "partner_configs" },
        pipeline: JSON.stringify([{ $set: { value: arrToJSON("$value", 3) } }]),
        columns: [
            { mongo_name: "type", sql_name: "type", ...str },
            { mongo_name: "partnerId", sql_name: "operatorId", ...str },
            { mongo_name: "value", sql_name: "value", ...str },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "partners" },
        columns: [
            { mongo_name: "alias", sql_name: "alias", ...str },
            { mongo_name: "name", sql_name: "name", ...str },
            { mongo_name: "partnerId", sql_name: "operatorId", ...str },
            { mongo_name: "isDisplayPlayerCurrency", sql_name: "isDisplayPlayerCurrency", ...bool },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "um_info" },
        columns: [
            { mongo_name: "time", sql_name: "time", ...date },
            { mongo_name: "start", sql_name: "start", ...date },
            { mongo_name: "end", sql_name: "end", ...date },
            { mongo_name: "partnerId", sql_name: "operatorId", ...str },
            { mongo_name: "isPartnerUm", sql_name: "isPartnerUm", ...bool },
            { mongo_name: "finish", sql_name: "finish", ...bool },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "userinfos" },
        columns: [
            { mongo_name: "name", sql_name: "name", ...str },
            { mongo_name: "UID", sql_name: "id", ...int64 },
            { mongo_name: "avatarId", sql_name: "avatarId", ...int64 },
            { mongo_name: "banned", sql_name: "banned", ...bool },
            { mongo_name: "currency", sql_name: "currency", ...str },
            { mongo_name: "disabled", sql_name: "disabled", ...bool },
            { mongo_name: "id", sql_name: "uid", ...str },
            { mongo_name: "joinedOn", sql_name: "joinedOn", ...date },
            { mongo_name: "type", sql_name: "isBot", ...bool },
            { mongo_name: "betLimitModifiedDate", sql_name: "betLimitModifiedDate", ...date },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "users" },
        columns: [
            { mongo_name: "_id", sql_name: "uid", ...oid },
            { mongo_name: "local.regDate", sql_name: "regDate", ...date },
            { mongo_name: "local.currency", sql_name: "currency", ...str },
            { mongo_name: "playerId", sql_name: "playerId", ...str },
            { mongo_name: "operatorId", sql_name: "operatorId", ...str },
            { mongo_name: "operatorIdPlayerId", sql_name: "operatorIdPlayerId", ...str },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "usersessions" },
        columns: [
            { mongo_name: "ssoTime", sql_name: "ssoTime", ...date },
            { mongo_name: "recheckInTime", sql_name: "recheckInTime", ...date },
            { mongo_name: "ip", sql_name: "ip", ...str },
            { mongo_name: "browserUserAgent", sql_name: "browserUserAgent", ...str },
            { mongo_name: "language", sql_name: "language", ...str },
            { mongo_name: "currencyCode", sql_name: "currencyCode", ...str },
            { mongo_name: "currencyName", sql_name: "currencyName", ...str },
            { mongo_name: "currencyGroupId", sql_name: "groupId", ...str },
            { mongo_name: "isTestCurrency", sql_name: "isTestCurrency", ...bool },
            { mongo_name: "multiplier", sql_name: "multiplier", ...float },
            { mongo_name: "system", sql_name: "system", ...int64 },
            { mongo_name: "operatorId", sql_name: "operatorId", ...str },
            { mongo_name: "siteName", sql_name: "siteName", ...str },
            { mongo_name: "siteId", sql_name: "siteId", ...str },
            { mongo_name: "userId", sql_name: "userId", ...str },
            { mongo_name: "playerId", sql_name: "playerId", ...str },
            { mongo_name: "playerName", sql_name: "playerName", ...str },
            { mongo_name: "disableJackpotGames", sql_name: "disableJackpotGames", ...bool },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
];

module.exports = { bizMetadataTables };
