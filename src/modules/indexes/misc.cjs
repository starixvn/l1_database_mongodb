// @ts-check

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    createdAt: {
        key: { createdAt: 1 },
        options: {},
    },
    displayGame: {
        key: { displayKind: 1, gameName: 1 },
        options: {},
    },
});

module.exports = indexes;
