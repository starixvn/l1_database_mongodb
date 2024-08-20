/** @satisfies { IndexConfig } */
const indexes = {
    memberId_iP: {
        key: { memberId: 1, iP: 1 },
        options: {},
    },
    token: {
        key: { token: 1 },
        options: {},
    },
};

module.exports = indexes;
