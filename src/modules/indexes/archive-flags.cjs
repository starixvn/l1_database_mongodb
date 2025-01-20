// @ts-check

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    TTL_31d: {
        key: { "__archive.eventtime": 1 },
        options: { expireAfterSeconds: 2_678_400 },
    },
    TTL_8d: {
        key: { "__archive.eventtime": 1 },
        options: { expireAfterSeconds: 691_200 },
    },
    TTL_1h: {
        key: { "__archive.eventtime": 1 },
        options: { expireAfterSeconds: 3600 },
    },
});

module.exports = indexes;
