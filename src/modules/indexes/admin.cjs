// @ts-check
const { LOCALES } = require("../const.cjs");

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    username_U_en: {
        key: { username: 1 },
        options: { unique: true, collation: LOCALES.en },
    },
});

module.exports = indexes;
