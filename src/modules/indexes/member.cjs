// @ts-check

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    memberId_iP: {
        key: { memberId: 1, iP: 1 },
        options: {},
    },
    iP_playerId_en: {
        key: { iP: 1, playerId: 1 },
        options: {
            collation: { locale: "en", strength: 2 },
        },
    },
    token: {
        key: { token: 1 },
        options: {},
    },
});

module.exports = indexes;
