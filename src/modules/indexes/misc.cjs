// @ts-check

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    batchId: {
        key: { batchId: 1 },
        options: {},
    },
    createdAt: {
        key: { createdAt: 1 },
        options: {},
    },
    displayGame: {
        key: { displayKind: 1, gameName: 1 },
        options: {},
    },
    finish_isPartner: {
        key: { finish: 1, isPartnerUm: 1 },
        options: {},
    },
});

module.exports = indexes;
