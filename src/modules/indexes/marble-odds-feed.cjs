// @ts-check
/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    event: {
        key: { eventID: 1 },
        options: {},
    },
    event_U: {
        key: { eventID: 1 },
        options: { unique: true },
    },
    game: {
        key: { gameId: 1 },
        options: {},
    },
    startTs: {
        key: { scheduleStartTs: 1 },
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
