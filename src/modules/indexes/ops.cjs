/** @satisfies { IndexConfig } */
const indexes = {
    category_type_U: {
        key: { category: 1, type: 1 },
        options: { unique: true },
    },
    gameConfigs_id_U: {
        key: { gameConfigs: 1, id: 1 },
        options: { unique: true },
    },
};

module.exports = indexes;
