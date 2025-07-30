// @ts-check
(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const commonConfig = { category: "games", type: 0, id: 0 };

    const summaryConfigs = [
        {
            ...commonConfig,
            gameConfigs: { gameId: 2, name: "xocxoc" },
            db: "hotdog_minigame",
            coll: { round: "_phiens", bet: "_cuocs" },
            aliases: { foreign: "roundId", playerId: "playerId", settled: "paid", time: "time", subRoundId: "roundId" },
            calc: {
                roundId: '"$id"',
                tickets: '{"$literal":1}',
                stake: '{"$multiply":[{"$add":["$even","$odd","$red3","$red4","$white3","$white4","$red2"]},{"$toInt":{"$not":"$freeBet"}}]}',
                payout: '"$betwin"',
                refund: '{"$literal":0}',
            },
        },
        {
            ...commonConfig,
            gameConfigs: { gameId: 10, name: "baccarat" },
            db: "hotdog_minigame",
            coll: { round: "_phiens", bet: "_cuocs" },
            aliases: { foreign: "roundId", playerId: "playerId", settled: "paid", time: "time", subRoundId: "roundId" },
            calc: {
                roundId: '"$id"',
                tickets: '{"$literal":1}',
                stake: '{"$multiply":[{"$add":["$banker","$bankerPair","$player","$playerPair","$tie","$big","$small"]},{"$toInt":{"$not":"$freeBet"}}]}',
                payout: '"$betwin"',
                refund: '{"$literal":0}',
            },
        },
        {
            ...commonConfig,
            gameConfigs: { gameId: 22, name: "vipsedie" },
            db: "hotdog_minigame",
            coll: { round: "_phiens", bet: "_cuocs" },
            aliases: { foreign: "roundId", playerId: "playerId", settled: "paid", time: "time", subRoundId: "roundId" },
            calc: {
                roundId: '"$id"',
                tickets: '{"$literal":1}',
                stake: '{"$multiply":[{"$add":["$even","$odd","$red3","$red4","$white3","$white4","$red2"]},{"$toInt":{"$not":"$freeBet"}}]}',
                payout: '"$betwin"',
                refund: '{"$literal":0}',
            },
        },
        {
            ...commonConfig,
            gameConfigs: { gameId: 1005, name: "seball1" },
            db: "hotdog_minigame",
            coll: { round: "_rounds", bet: "_bets" },
            aliases: { foreign: "roundId", playerId: "playerId", settled: "paid", time: "time", subRoundId: "drawId" },
            calc: {
                roundId: '"$id"',
                tickets: '{"$literal":1}',
                stake: '"$totalAmount"',
                payout: '"$betwin"',
                refund: '{"$literal":0}',
            },
        },
        {
            ...commonConfig,
            gameConfigs: { gameId: 1007, name: "sicball" },
            db: "hotdog_minigame",
            coll: { round: "_rounds", bet: "_bets" },
            aliases: { foreign: "roundId", playerId: "playerId", settled: "paid", time: "time", subRoundId: "drawId" },
            calc: {
                roundId: '"$id"',
                tickets: '{"$literal":1}',
                stake: '"$totalAmount"',
                payout: '"$betwin"',
                refund: '{"$literal":0}',
            },
        },
    ];

    /** @type { AnyBulkWriteOperation[] } */
    const bulkWrite = summaryConfigs.map((doc) => {
        const { gameConfigs, id } = doc;
        const data = Object.assign({}, { _id: { gameConfigs, id } }, doc);

        return {
            replaceOne: {
                filter: { gameConfigs, id },
                replacement: data,
                upsert: true,
            },
        };
    });

    const opsDB = db.getSiblingDB("hotdog_ops_configs");
    if (bulkWrite.length) {
        const res = await opsDB.getCollection("hotdog_summary_configs").bulkWrite(bulkWrite, { ordered: false });
        log("I", "DATA", `[${opsDB.getName()}.hotdog_summary_configs]`, `• ${stringifyResult(res)}`);
    }
})();
