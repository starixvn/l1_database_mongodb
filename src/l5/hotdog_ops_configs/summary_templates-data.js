// @ts-check
(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const hotdogOpsConfigsDBName = "hotdog_ops_configs";
    const hotdogMinigameDBName = "hotdog_minigame";
    const summaryTemplates = [
        {
            category: "games",
            type: 2,
            targets: [{ db: hotdogOpsConfigsDBName, coll: "summary_configs" }],
            data: [
                {
                    db: hotdogMinigameDBName,
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
            targets: [{ db: hotdogOpsConfigsDBName, coll: "summary_configs" }],
            data: [
                {
                    db: hotdogMinigameDBName,
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
            targets: [{ db: hotdogOpsConfigsDBName, coll: "summary_configs" }],
            data: [
                {
                    db: hotdogMinigameDBName,
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
            targets: [{ db: hotdogOpsConfigsDBName, coll: "summary_configs" }],
            data: [
                {
                    db: hotdogMinigameDBName,
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
            type: 6,
            targets: [{ db: hotdogOpsConfigsDBName, coll: "summary_configs" }],
            data: [
                {
                    db: hotdogMinigameDBName,
                    coll: { round: "_rounds", bet: "_bets" },
                    aliases: { foreign: "roundId", playerId: "playerId", settled: "paid", time: "time", subRoundId: "drawId" },
                    calc: {
                        roundId: '"$id"',
                        tickets: '{"$literal":1}',
                        stake: '{"$multiply":["$totalAmount",{"$toInt":{"$not":"$freeBet"}}]}',
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
            targets: [{ db: hotdogOpsConfigsDBName, coll: "summary_configs" }],
            data: [
                {
                    db: hotdogMinigameDBName,
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
            targets: [{ db: hotdogOpsConfigsDBName, coll: "summary_configs" }],
            data: [
                {
                    db: hotdogMinigameDBName,
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
            targets: [{ db: hotdogOpsConfigsDBName, coll: "summary_configs" }],
            data: [
                {
                    db: hotdogMinigameDBName,
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
            type: 10,
            targets: [{ db: hotdogOpsConfigsDBName, coll: "summary_configs" }],
            data: [
                {
                    db: hotdogMinigameDBName,
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
            type: 11,
            targets: [{ db: hotdogOpsConfigsDBName, coll: "summary_configs" }],
            data: [
                {
                    db: hotdogMinigameDBName,
                    coll: { round: "_rounds" },
                    filter: '{"paid":true}',
                    aliases: { playerId: "playerId", settled: "paid", time: "time", subRoundId: "id" },
                    calc: {
                        roundId: '"$id"',
                        tickets: '{"$literal":1}',
                        stake: '"$totalAmount"',
                        payout: '"$betWin"',
                        refund: '{"$literal":0}',
                    },
                },
            ],
            __v: 2,
        },
        {
            category: "games",
            type: 13,
            targets: [{ db: hotdogOpsConfigsDBName, coll: "summary_configs" }],
            data: [
                {
                    db: hotdogMinigameDBName,
                    coll: { round: "_rounds" },
                    filter: '{"paid":true}',
                    aliases: { playerId: "playerId", settled: "paid", time: "time", subRoundId: "id" },
                    calc: {
                        roundId: '"$id"',
                        tickets: '{"$literal":1}',
                        stake: '"$totalAmount"',
                        payout: '"$betWin"',
                        refund: '{"$literal":0}',
                    },
                },
            ],
            __v: 2,
        },
    ];

    /** @type { AnyBulkWriteOperation[] } */
    const bulkWrite = summaryTemplates.map((doc) => {
        const { category, type } = doc;
        const data = Object.assign({}, { _id: { category, type } }, doc);

        return {
            replaceOne: {
                filter: { category, type },
                replacement: data,
                upsert: true,
            },
        };
    });

    const opsDB = db.getSiblingDB("hotdog_ops_configs");
    if (bulkWrite.length) {
        const res = await opsDB.getCollection("summary_templates").bulkWrite(bulkWrite, { ordered: false });
        log("I", "DATA", `[${opsDB.getName()}.summary_templates]`, `• ${stringifyResult(res)}`);
    }
})();
