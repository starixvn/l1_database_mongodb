/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    category_type_U: {
        key: { category: 1, type: 1 },
        options: { unique: true },
    },
    gameConfigs_id_U: {
        key: { gameConfigs: 1, id: 1 },
        options: { unique: true },
    },
    name_id_U: {
        key: { "gameConfigs.name": 1, id: 1 },
        options: { unique: true },
    },
});

module.exports = indexes;
