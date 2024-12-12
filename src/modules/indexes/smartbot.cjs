/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    time_group: {
        key: { time: 1, group: 1 },
        options: {},
    },
    pat_time: {
        key: { patId: 1, time: 1 },
        options: {},
    },
});

module.exports = indexes;
