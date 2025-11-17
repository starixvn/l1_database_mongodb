// @ts-check
const indexTemplates = /** @type {const} */ ([
    {
        category: "games",
        type: 2,
        colls: [
            {
                ns: { db: "minigame", postfix: "_rounds" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time: '{"key":{"time":1}}',
                    id_U: '{"key":{"id":1},"unique":true}',
                    summarized: '{"key":{"__archive.summarized":1}}',
                    do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
                    paid_uid: '{"key":{"paid":1,"uid":1}}',
                    playerId_id_F: '{"key":{"playerId":1,"id":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_freespins" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    id_U: '{"key":{"id":1},"unique":true}',
                    expiryTime: '{"key":{"expiryTime":1}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_fames" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    uid_roundId_U: '{"key":{"uid":1,"roundId":1},"unique":true}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_jackpots" },
                idxs: {
                    jackpot_prize_FU: '{"key":{"jackpotConfigId":1,"prize":1},"unique":true,"partialFilterExpression":{"hitAt":null,"prize":{"$gt":""}}}',
                    jackpot_prize_created_FU: '{"key":{"jackpotConfigId":1,"prize":1,"createdAt":1},"unique":true,"partialFilterExpression":{"prize":{"$gt":""}}}',
                    __archive_summarized: '{"key":{"__archive.summarized":1}}',
                    __archive_do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_tmprounds" },
                idxs: {
                    timeTTL: '{"key":{"endTime":1},"expireAfterSeconds":1200}',
                    roundId: '{"key":{"roundId":1}}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 3,
        colls: [
            {
                ns: { db: "minigame", postfix: "_rounds" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time: '{"key":{"time":1}}',
                    id_U: '{"key":{"id":1},"unique":true}',
                    summarized: '{"key":{"__archive.summarized":1}}',
                    do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
                    paid_uid: '{"key":{"paid":1,"uid":1}}',
                    playerId_id_F: '{"key":{"playerId":1,"id":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_freespins" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    id_U: '{"key":{"id":1},"unique":true}',
                    expiryTime: '{"key":{"expiryTime":1}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_multipliers" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    playerId: '{"key":{"playerId":1}}',
                    uid_ended_F: '{"key":{"uid":1,"ended":1},"unique":true,"partialFilterExpression":{"ended":false}}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 4,
        colls: [
            {
                ns: { db: "minigame", postfix: "_rounds" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time: '{"key":{"time":1}}',
                    id_U: '{"key":{"id":1},"unique":true}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_betlogs" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                    uid: '{"key":{"uid":1}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_bets" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                    uid_roundId: '{"key":{"uid":1,"roundId":1},"unique":true}',
                    uid_paid: '{"key":{"uid":1,"paid":1,"_id":1}}',
                    summarized: '{"key":{"__archive.summarized":1}}',
                    do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_tmpbets" },
                idxs: {
                    timeTTL: '{"key":{"time":1},"expireAfterSeconds":1200}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    uid_round_U: '{"key":{"uid":1,"roundId":1},"unique":true}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 5,
        colls: [
            {
                ns: { db: "minigame", postfix: "_rounds" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time: '{"key":{"time":1}}',
                    id_U: '{"key":{"id":1},"unique":true}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_results" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time: '{"key":{"time":1}}',
                    roundId_U: '{"key":{"roundId":1},"unique":true}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_livegamelogs" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time: '{"key":{"time":1}}',
                    roundId: '{"key":{"roundId":1}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_betlogs" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                    uid: '{"key":{"uid":1}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_bets" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                    uid_roundId: '{"key":{"uid":1,"roundId":1},"unique":true}',
                    uid_paid: '{"key":{"uid":1,"paid":1,"_id":1}}',
                    summarized: '{"key":{"__archive.summarized":1}}',
                    do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_tmpbetlogs" },
                idxs: {
                    timeTTL: '{"key":{"time":1},"expireAfterSeconds":1200}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    uid: '{"key":{"uid":1}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_tmpbets" },
                idxs: {
                    timeTTL: '{"key":{"time":1},"expireAfterSeconds":1200}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    uid_round_U: '{"key":{"uid":1,"roundId":1},"unique":true}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 7,
        colls: [
            {
                ns: { db: "minigame", postfix: "_rounds" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time: '{"key":{"time":1}}',
                    id_U: '{"key":{"id":1},"unique":true}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_results" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    roundId: '{"key":{"roundId":1}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_betlogs" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                    uid: '{"key":{"uid":1}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_bets" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                    uid_roundId: '{"key":{"uid":1,"roundId":1},"unique":true}',
                    summarized: '{"key":{"__archive.summarized":1}}',
                    do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_tmpbets" },
                idxs: {
                    timeTTL: '{"key":{"time":1},"expireAfterSeconds":600}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    uid_round_U: '{"key":{"uid":1,"roundId":1},"unique":true}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_tournaments" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 8,
        colls: [
            {
                ns: { db: "minigame", postfix: "_rounds" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time: '{"key":{"time":1}}',
                    id_U: '{"key":{"id":1},"unique":true}',
                    uid_paidFalse_U: '{"key":{"uid":1,"paid":1},"unique":true,"partialFilterExpression":{"paid":false}}',
                    summarized: '{"key":{"__archive.summarized":1}}',
                    do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_results" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    roundId: '{"key":{"roundId":1}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_betlogs" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                    uid: '{"key":{"uid":1}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_fames" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    uid_roundId_U: '{"key":{"uid":1,"roundId":1},"unique":true}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 9,
        colls: [
            {
                ns: { db: "minigame", postfix: "_rounds" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time: '{"key":{"time":1}}',
                    id_U: '{"key":{"id":1},"unique":true}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_betlogs" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                    uid: '{"key":{"uid":1}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_bets" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                    uid_roundId: '{"key":{"uid":1,"roundId":1},"unique":true}',
                    summarized: '{"key":{"__archive.summarized":1}}',
                    do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_leaderboards" },
                idxs: {
                    date_operator_currency_U: '{"key":{"date":1,"operatorId":1,"currency":1},"unique":true}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 10,
        colls: [
            {
                ns: { db: "minigame", postfix: "_rounds" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time: '{"key":{"time":1}}',
                    id_U: '{"key":{"id":1},"unique":true}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_results" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    roundId: '{"key":{"roundId":1}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_betlogs" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                    uid: '{"key":{"uid":1}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_bets" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                    uid_roundId: '{"key":{"uid":1,"roundId":1},"unique":true}',
                    summarized: '{"key":{"__archive.summarized":1}}',
                    do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_tmpbets" },
                idxs: {
                    timeTTL: '{"key":{"time":1},"expireAfterSeconds":600}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    uid_round_U: '{"key":{"uid":1,"roundId":1},"unique":true}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 11,
        colls: [
            {
                ns: { db: "minigame", postfix: "_rounds" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time: '{"key":{"time":1}}',
                    id_U: '{"key":{"id":1},"unique":true}',
                    summarized: '{"key":{"__archive.summarized":1}}',
                    do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
                    paid_uid: '{"key":{"paid":1,"uid":1}}',
                    playerId_id_F: '{"key":{"playerId":1,"id":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_results" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    roundId: '{"key":{"roundId":1}}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 13,
        colls: [
            {
                ns: { db: "minigame", postfix: "_rounds" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time: '{"key":{"time":1}}',
                    id_U: '{"key":{"id":1},"unique":true}',
                    uid_paidFalse_U: '{"key":{"uid":1,"paid":1},"unique":true,"partialFilterExpression":{"paid":false}}',
                    summarized: '{"key":{"__archive.summarized":1}}',
                    do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_results" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    roundId: '{"key":{"roundId":1}}',
                },
            },
            {
                ns: { db: "minigame", postfix: "_betlogs" },
                idxs: {
                    TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                    time_archive: '{"key":{"time":1,"__archive.eventtime":1}}',
                    roundId: '{"key":{"roundId":1,"_id":1}}',
                    player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"playerId":{"$gt":""}}}',
                    uid: '{"key":{"uid":1}}',
                },
            },
        ],
        __v: 2,
    },
]);

module.exports = { indexTemplates };
