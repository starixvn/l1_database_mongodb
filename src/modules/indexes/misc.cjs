// @ts-check

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    createdAt: {
        key: { createdAt: 1 },
        options: {},
    },
});

module.exports = indexes;
