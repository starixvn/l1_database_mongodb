// @ts-check

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    StartDate: {
        key: { StartDate: 1 },
        options: {},
    },
    logTimeStamp: {
        key: { logTimeStamp: 1 },
        options: {},
    },
    betlogs: {
        key: { "__archive.betlogs": 1, _id: 1 },
        options: {},
    },
});

module.exports = indexes;
