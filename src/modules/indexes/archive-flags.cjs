/** @satisfies { IndexConfig } */
const indexes = {
    TTL: {
        key: { "__archive.eventtime": 1 },
        options: { expireAfterSeconds: 3600 * 24 * 8 },
    },
};

module.exports = indexes;
