// @ts-check
const { LOCALES } = require("../const.cjs");

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    currency_en: {
        key: { currency: 1 },
        options: { collation: LOCALES.en },
    },
    id_U: {
        key: { id: -1 },
        options: { unique: true, collation: LOCALES.simple },
    },
    id_U_en: {
        key: { id: 1 },
        options: { unique: true, collation: LOCALES.en },
    },
    memberId: {
        key: { "local.memberId": 1 },
        options: { collation: LOCALES.simple },
    },
    name_U_en: {
        key: { name: 1 },
        options: { unique: true, collation: LOCALES.en },
    },
    operatorId: {
        key: { operatorId: 1 },
        options: { collation: LOCALES.simple },
    },
    playerId: {
        key: { playerId: 2 },
        options: { collation: LOCALES.simple },
    },
    playerId_en: {
        key: { playerId: 1 },
        options: { collation: LOCALES.en },
    },
    recheckInTime: {
        key: { recheckInTime: 1 },
        options: {},
    },
    sessionId_U: {
        key: { sessionId: 1 },
        options: { unique: true },
    },
    ssoToken: {
        key: { ssoToken: 1 },
        options: {},
    },
    type_inRoom_en: {
        key: { type: 1, inRoom: 1, inGameRoom: 1 },
        options: { collation: LOCALES.en },
    },
    typeTrue_red_en: {
        key: { type: 1, red: 1 },
        options: { collation: LOCALES.en, partialFilterExpression: { type: true } },
    },
    typeTrue_disabled_inRoom_en: {
        key: { type: 1, disabled: 1, inRoom: 1 },
        options: { collation: LOCALES.en, partialFilterExpression: { type: true } },
    },
    UID_U_en: {
        key: { UID: 1 },
        options: { unique: true, collation: LOCALES.en },
    },
    user_sso: {
        key: { userId: 1, ssoTime: 1 },
        options: {},
    },
    username_U_en: {
        key: { "local.username": 1 },
        options: { unique: true, collation: LOCALES.en },
    },
});

module.exports = indexes;
