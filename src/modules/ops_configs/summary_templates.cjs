// @ts-check
const summaryTemplates = /** @type {const} */ ([
    {
        category: "games",
        type: 2,
        targets: [{ db: "ops_configs", coll: "summary_configs" }],
        data: [
            {
                db: "minigame",
                coll: { round: "_rounds" },
                filter: '{"paid":true}',
                aliases: { playerId: "playerId", settled: "paid", time: "time", subRoundId: "id" },
                calc: {
                    roundId: '"$id"',
                    tickets: '{"$literal":1}',
                    stake: '{"$multiply":["$totalAmount",{"$toInt":{"$not":"$freeSpin"}}]}',
                    payout: '"$betWin"',
                    refund: '{"$literal":0}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 3,
        targets: [{ db: "ops_configs", coll: "summary_configs" }],
        data: [
            {
                db: "minigame",
                coll: { round: "_rounds" },
                filter: '{"paid":true}',
                aliases: { playerId: "playerId", settled: "paid", time: "time", subRoundId: "id" },
                calc: {
                    roundId: '"$id"',
                    tickets: '{"$literal":1}',
                    stake: '{"$multiply":["$totalAmount",{"$toInt":{"$not":"$freeSpin"}}]}',
                    payout: '"$betwin"',
                    refund: '{"$literal":0}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 4,
        targets: [{ db: "ops_configs", coll: "summary_configs" }],
        data: [
            {
                db: "minigame",
                coll: { round: "_rounds", bet: "_bets" },
                aliases: { foreign: "roundId", playerId: "playerId", settled: "paid", time: "time", subRoundId: "roundId" },
                calc: {
                    roundId: '"$id"',
                    tickets: '{"$literal":1}',
                    stake: '"$totalAmount"',
                    payout: '"$betwin"',
                    refund: '{"$literal":0}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 5,
        targets: [{ db: "ops_configs", coll: "summary_configs" }],
        data: [
            {
                db: "minigame",
                coll: { round: "_rounds", bet: "_bets" },
                aliases: { foreign: "roundId", playerId: "playerId", settled: "paid", time: "time", subRoundId: "roundId" },
                calc: {
                    roundId: '"$id"',
                    tickets: '{"$literal":1}',
                    stake: '{"$multiply":["$totalAmount",{"$toInt":{"$not":"$freeSpin"}}]}',
                    payout: '"$betwin"',
                    refund: '{"$literal":0}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 7,
        targets: [{ db: "ops_configs", coll: "summary_configs" }],
        data: [
            {
                db: "minigame",
                coll: { round: "_rounds", bet: "_bets" },
                aliases: { foreign: "roundId", playerId: "playerId", settled: "paid", time: "time", subRoundId: "roundId" },
                calc: {
                    roundId: '"$id"',
                    tickets: '{"$literal":1}',
                    stake: '"$totalAmount"',
                    payout: '"$betwin"',
                    refund: '{"$literal":0}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 8,
        targets: [{ db: "ops_configs", coll: "summary_configs" }],
        data: [
            {
                db: "minigame",
                coll: { round: "_rounds" },
                filter: '{"paid":true}',
                aliases: { playerId: "playerId", settled: "paid", time: "time", subRoundId: "id" },
                calc: {
                    roundId: '"$id"',
                    tickets: '{"$literal":1}',
                    stake: '"$totalAmount"',
                    payout: '"$betwin"',
                    refund: '{"$literal":0}',
                },
            },
        ],
        __v: 2,
    },
    {
        category: "games",
        type: 9,
        targets: [{ db: "ops_configs", coll: "summary_configs" }],
        data: [
            {
                db: "minigame",
                coll: { round: "_rounds", bet: "_bets" },
                aliases: { foreign: "roundId", playerId: "playerId", settled: "paid", time: "time", subRoundId: "roundId" },
                calc: {
                    roundId: '"$id"',
                    tickets: '{"$literal":1}',
                    stake: '"$totalAmount"',
                    payout: '"$betwin"',
                    refund: '{"$literal":0}',
                },
            },
        ],
        __v: 2,
    },
]);

module.exports = { summaryTemplates };
