const LOCALE = {
    simple: { locale: "simple" },
    en: { locale: "en", strength: 2 },
};

/** @satisfies {import("../type.cjs").IndexConfig} */
const indexes = {
    TTL: {
        key: { "__archive.eventtime": 1 },
        options: { expireAfterSeconds: 3600 * 24 * 8 },
    },
    currency_en: {
        key: { currency: 1 },
        options: { collation: LOCALE.en },
    },
    id_U: {
        key: { id: 1 },
        options: { unique: true, collation: LOCALE.simple },
    },
    id_U_en: {
        key: { id: 1 },
        options: { unique: true, collation: LOCALE.en },
    },
    memberId: {
        key: { "local.memberId": 1 },
        options: {},
    },
    name_U_en: {
        key: { name: 1 },
        options: { unique: true, collation: LOCALE.en },
    },
    operatorId: {
        key: { operatorId: 1 },
        options: { collation: LOCALE.simple },
    },
    playerId: {
        key: { playerId: 1 },
        options: { collation: LOCALE.simple },
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
    type_inRoom: {
        key: { type: 1, inRoom: 1, inGameRoom: 1 },
        options: {},
    },
    UID_U_en: {
        key: { UID: 1 },
        options: { unique: true, collation: LOCALE.en },
    },
    username_U_en: {
        key: { "local.username": 1 },
        options: { unique: true, collation: LOCALE.en },
    },
};

module.exports = indexes;
