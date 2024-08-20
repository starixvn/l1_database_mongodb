const { LOCALES } = require("../const.cjs");

/** @satisfies { IndexConfig } */
const indexes = {
    username_U_en: {
        key: { username: 1 },
        options: { unique: true, collation: LOCALES.en },
    },
};

module.exports = indexes;
