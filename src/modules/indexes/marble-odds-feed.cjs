// @ts-check
/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    event: {
        key: { eventID: 1 },
        options: {},
    },
    game: {
        key: { gameId: 1 },
        options: {},
    },
    game_event: {
        key: { gameId: 1, eventID: 1 },
        options: {},
    },
    game_round_U: {
        key: { gameId: 1, roundId: 1 },
        options: { unique: true },
    },
    timestamp: {
        key: { timestamp: 1 },
        options: {},
    },
});

module.exports = indexes;
