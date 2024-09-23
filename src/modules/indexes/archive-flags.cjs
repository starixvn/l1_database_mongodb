/** @satisfies { IndexConfig } */
const indexes = {
    TTL_31d: {
        key: { "__archive.eventtime": 1 },
        options: { expireAfterSeconds: 3600 * 24 * 31 },
    },
    TTL_8d: {
        key: { "__archive.eventtime": 1 },
        options: { expireAfterSeconds: 3600 * 24 * 8 },
    },
    TTL_1h: {
        key: { "__archive.eventtime": 1 },
        options: { expireAfterSeconds: 3600 },
    },
};

module.exports = indexes;
