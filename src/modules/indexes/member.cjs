/** @satisfies { IndexConfig } */
const indexes = {
    StartDate: {
        key: { StartDate: 1 },
        options: {},
    },
    requestTimeStamp: {
        key: { requestTimeStamp: 1 },
        options: {},
    },
    logTimeStamp: {
        key: { requestTimeStamp: 1 },
        options: {},
    },
    betlogs: {
        key: { "__archive.betlogs": 1, _id: 1 },
        options: {},
    },
};

module.exports = indexes;
