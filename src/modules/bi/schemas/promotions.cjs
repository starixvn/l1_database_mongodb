// @ts-check
const { date, filter, float, int64, str, bool } = require("../data-types.cjs");
const { arrToJSON } = require("../ultilities.cjs");

/** @type { BITable[] } */
const promotionTables = [
    {
        _id: { db: "minigame", table: "promotions" },
        source: "promotion_configs",
        pipeline: JSON.stringify([
            { $set: { winningPrizes: arrToJSON("$winningPrizes", 2) } }, //
        ]),
        columns: [
            { mongo_name: "promotionId", sql_name: "promotionId", ...int64 },
            { mongo_name: "name", sql_name: "name", ...str },
            { mongo_name: "status", sql_name: "status", ...str },
            { mongo_name: "startDateTime", sql_name: "startTime", ...date },
            { mongo_name: "endDateTime", sql_name: "endTime", ...date },
            { mongo_name: "updatedTime", sql_name: "updatedTime", ...date },
            { mongo_name: "winningPrizes", sql_name: "winningPrizes", ...str },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "promotion_configs" },
        pipeline: JSON.stringify([
            { $project: { _id: 0, promotionId: 1, status: 1, startDateTime: 1, endDateTime: 1, operators: 1 } },
            { $unwind: "$operators" },
            { $unwind: "$operators.currencyGroups" },
            { $set: { "operators.includedSiteNames": { $ifNull: ["$operators.includedSiteNames", ""] } } },
        ]),
        columns: [
            { mongo_name: "promotionId", sql_name: "promotionId", ...int64 },
            { mongo_name: "status", sql_name: "status", ...str },
            { mongo_name: "startDateTime", sql_name: "startTime", ...date },
            { mongo_name: "endDateTime", sql_name: "endTime", ...date },
            { mongo_name: "operators.operatorId", sql_name: "operatorId", ...str },
            { mongo_name: "operators.includedSiteNames", sql_name: "includedSiteNames", ...str },
            { mongo_name: "operators.currencyGroups.currencyGroupId", sql_name: "currencyGroupId", ...str },
            { mongo_name: "operators.currencyGroups.otherGameMinBet", sql_name: "otherGameMinBet", ...float },
            { mongo_name: "operators.currencyGroups.slotGameMinBet", sql_name: "slotGameMinBet", ...float },
            { mongo_name: "operators.currencyGroups.enabled", sql_name: "enabled", ...bool },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
    {
        _id: { db: "minigame", table: "promotion_leaderboards" },
        columns: [
            { mongo_name: "promotionId", sql_name: "promotionId", ...int64 },
            { mongo_name: "playerId", sql_name: "playerId", ...str },
            { mongo_name: "operatorId", sql_name: "operatorId", ...str },
            { mongo_name: "currency", sql_name: "currency", ...str },
            { mongo_name: "currencyCode", sql_name: "currencyCode", ...str },
            { mongo_name: "currencyGroupId", sql_name: "currencyGroupId", ...str },
            { mongo_name: "dataSourceTimeStamp", sql_name: "dataSourceTimeStamp", ...date },
            { mongo_name: "isTestCurrency", sql_name: "isTestCurrency", ...bool },
            { mongo_name: "multiplier", sql_name: "multiplier", ...float },
            { mongo_name: "nickName", sql_name: "nickName", ...str },
            { mongo_name: "playerName", sql_name: "playerName", ...str },
            { mongo_name: "pointInBaseCurrency", sql_name: "point", ...float },
            { mongo_name: "siteId", sql_name: "siteId", ...str },
            { mongo_name: "siteName", sql_name: "siteName", ...str },
            { mongo_name: "updatedTime", sql_name: "updatedTime", ...date },
            { mongo_name: "_MONGOFILTER", sql_name: "_MONGOFILTER", ...filter },
        ],
    },
];

module.exports = { promotionTables };
