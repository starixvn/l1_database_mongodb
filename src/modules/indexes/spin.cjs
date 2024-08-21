/** @satisfies { IndexConfig } */
const indexes = {
    id_U: {
        key: { id: 1 },
        options: { unique: true },
    },
    player: {
        key: { playerId: 1 },
        options: {},
    },
    member_time: {
        key: { memberId: 1, time: 1 },
        options: {},
    },
    player_U: {
        key: { playerId: 1 },
        options: { unique: true },
    },
    round_member: {
        key: { roundId: -1, memberId: 1 },
        options: {},
    },
    round_member_FU: {
        key: { roundId: 1, memberId: 1 },
        options: { unique: true, partialFilterExpression: { roundId: { $type: `double` } } },
    },
    time_player: {
        key: { time: 1, playerId: 1 },
        options: {},
    },
};

module.exports = indexes;
