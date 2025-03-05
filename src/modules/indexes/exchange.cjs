// @ts-check

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    exId_U: {
        key: { exId: 1 },
        options: { unique: true },
    },
    time: {
        key: { time: 1 },
        options: {},
    },
});

module.exports = indexes;
