/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    draw: {
        key: { drawId: 1 },
        options: {},
    },
    draw_U: {
        key: { drawId: 1 },
        options: { unique: true },
    },
    firstRoundId: {
        key: { firstRoundId: 1 },
        options: {},
    },
    id: {
        key: { id: 1 },
        options: {},
    },
    id_U: {
        key: { id: 1 },
        options: { unique: true },
    },
    isAvailable_FU: {
        key: { isAvailable: 1 },
        options: { unique: true, partialFilterExpression: { isAvailable: true } },
    },
    player: {
        key: { playerId: 1 },
        options: {},
    },
    player_round: {
        key: { playerId: 1, roundId: 1 },
        options: {},
    },
    player_round_F: {
        key: { playerId: 1, roundId: 1 },
        options: {
            partialFilterExpression: { playerId: { $gt: "" } },
        },
    },
    round: {
        key: { roundId: 1 },
        options: {},
    },
    round__id: {
        key: { roundId: 1, _id: 1 },
        options: {},
    },
    round_bot_U: {
        key: { roundId: 1, botId: 1 },
        options: { unique: true },
    },
    startTime: {
        key: { startTime: 1 },
        options: {},
    },
    time: {
        key: { time: 1 },
        options: {},
    },
    time_archive: {
        key: { time: 1, "__archive.eventtime": 1 },
        options: {},
    },
    time_TTL_2m: {
        key: { time: 1 },
        options: { expireAfterSeconds: 120 },
    },
    uid: {
        key: { uid: 1 },
        options: {},
    },
    uid__id: {
        key: { uid: 1, _id: 1 },
        options: {},
    },
    uid_draw_U: {
        key: { uid: 1, drawId: 1 },
        options: { unique: true },
    },
    uid_paid__id: {
        key: { uid: 1, paid: 1, _id: 1 },
        options: {},
    },
    uid_round_U: {
        key: { uid: 1, roundId: 1 },
        options: { unique: true },
    },
    uid_round_freeBet_U: {
        key: { uid: 1, roundId: 1, freeBet: 1 },
        options: { unique: true },
    },
});

module.exports = indexes;
