/** @satisfies { IndexGroup } */
const indexes = /** @type {const} */ ({
    featureMD5: [
        {
            key: { "encryptedResultHash.iv": 1 },
            options: {
                partialFilterExpression: { "encryptedResultHash.iv": { $type: "string" } },
            },
        },
        {
            key: { "encryptedResultHash.content": 1 },
            options: {
                partialFilterExpression: { "encryptedResultHash.content": { $type: "string" } },
            },
        },
        {
            key: { "encryptedResult.iv": 1 },
            options: {
                partialFilterExpression: { "encryptedResult.iv": { $type: "string" } },
            },
        },
        {
            key: { "encryptedResult.content": 1 },
            options: {
                partialFilterExpression: { "encryptedResult.content": { $type: "string" } },
            },
        },
    ],
    featureProvablyFair: [
        {
            key: { finalHash: 1 },
            options: {
                partialFilterExpression: { finalHash: { $type: "string" } },
            },
        },
        {
            key: { serverSeedHash: 1 },
            options: {
                partialFilterExpression: { serverSeedHash: { $type: "string" } },
            },
        },
    ],
    featureShoe: [
        {
            key: { "shoe.encryptedShoe.iv": 1 },
            options: {
                partialFilterExpression: { "shoe.encryptedShoe.iv": { $type: "string" } },
            },
        },
        {
            key: { "shoe.encryptedShoe.content": 1 },
            options: {
                partialFilterExpression: { "shoe.encryptedShoe.content": { $type: "string" } },
            },
        },
        {
            key: { "shoe.encryptedShoeHash.iv": 1 },
            options: {
                partialFilterExpression: { "shoe.encryptedShoeHash.iv": { $type: "string" } },
            },
        },
        {
            key: { "shoe.encryptedShoeHash.content": 1 },
            options: {
                partialFilterExpression: { "shoe.encryptedShoeHash.content": { $type: "string" } },
            },
        },
    ],
});

module.exports = indexes;
