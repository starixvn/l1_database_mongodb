// @ts-check
const { LOCALES } = require("../const.cjs");

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    name_U: {
        key: { name: -1 },
        options: { unique: true },
    },
    name_U_en: {
        key: { name: 1 },
        options: { unique: true, collation: LOCALES.en },
    },
    partner_en: {
        key: { partnerId: 1 },
        options: { collation: LOCALES.en },
    },
    partner_U_en: {
        key: { partnerId: 1 },
        options: { unique: true, collation: LOCALES.en },
    },
    type_U: {
        key: { type: 1 },
        options: { unique: true },
    },
    name_partner_U: {
        key: { name: 1, partnerId: -1 },
        options: { unique: true, collation: LOCALES.simple },
    },
    name_partner_U_en: {
        key: { name: 1, partnerId: 1 },
        options: { unique: true, collation: LOCALES.en },
    },
    group_game_U: {
        key: { groupId: 1, gameId: 1 },
        options: { unique: true },
    },
    value_U: {
        key: { value: 1 },
        options: { unique: true },
    },
    gameId_U: {
        key: { gameId: 1 },
        options: { unique: true },
    },
});

module.exports = indexes;
