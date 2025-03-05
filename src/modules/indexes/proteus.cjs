// @ts-check

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    ts: {
        key: { ts: 1 },
        options: {},
    },
    ts_TTL_8d: {
        key: { ts: 1 },
        options: { expireAfterSeconds: 8 * 24 * 3_600 },
    },
});

module.exports = indexes;
