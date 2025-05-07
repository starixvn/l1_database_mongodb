// @ts-check
/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    uuid_collection: {
        key: { uuid: 1, collection: 1 },
        options: {},
    },
});

module.exports = indexes;
