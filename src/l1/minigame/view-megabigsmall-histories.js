(async () => {
    const { getIdentity, ensureView } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const gameDB = db.getSiblingDB("minigame");

    await ensureView(gameDB, "megabigsmall_histories", {
        viewOn: "users",
        pipeline: [
            {
                $project: {
                    _id: 0,
                    playerId: 1,
                    operatorId: 1,
                },
            },
            {
                $lookup: {
                    from: "unbalancedbigsmall1_bets",
                    localField: "playerId",
                    foreignField: "playerId",
                    let: { playerId: "$playerId", operatorId: "$operatorId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$paid", true] }, //
                                        { $eq: ["$playerId", "$$playerId"] },
                                        { $eq: ["$operatorId", "$$operatorId"] },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall1_betlogs",
                                localField: "playerId",
                                foreignField: "playerId",
                                let: { roundId: "$roundId", playerId: "$playerId", operatorId: "$operatorId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$roundId", "$$roundId"] }, //
                                                    { $eq: ["$playerId", "$$playerId"] },
                                                    { $eq: ["$operatorId", "$$operatorId"] },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall1_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 50 } } },
                    ],
                    as: "lasvegas",
                },
            },
            {
                $lookup: {
                    from: "unbalancedbigsmall2_bets",
                    localField: "playerId",
                    foreignField: "playerId",
                    let: { playerId: "$playerId", operatorId: "$operatorId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$paid", true] }, //
                                        { $eq: ["$playerId", "$$playerId"] },
                                        { $eq: ["$operatorId", "$$operatorId"] },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall2_betlogs",
                                localField: "playerId",
                                foreignField: "playerId",
                                let: { roundId: "$roundId", playerId: "$playerId", operatorId: "$operatorId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$roundId", "$$roundId"] }, //
                                                    { $eq: ["$playerId", "$$playerId"] },
                                                    { $eq: ["$operatorId", "$$operatorId"] },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall2_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 51 } } },
                    ],
                    as: "marinabay",
                },
            },
            {
                $lookup: {
                    from: "unbalancedbigsmall3_bets",
                    localField: "playerId",
                    foreignField: "playerId",
                    let: { playerId: "$playerId", operatorId: "$operatorId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$paid", true] }, //
                                        { $eq: ["$playerId", "$$playerId"] },
                                        { $eq: ["$operatorId", "$$operatorId"] },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall3_betlogs",
                                localField: "playerId",
                                foreignField: "playerId",
                                let: { roundId: "$roundId", playerId: "$playerId", operatorId: "$operatorId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$roundId", "$$roundId"] }, //
                                                    { $eq: ["$playerId", "$$playerId"] },
                                                    { $eq: ["$operatorId", "$$operatorId"] },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall3_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 54 } } },
                    ],
                    as: "macau",
                },
            },
            {
                $lookup: {
                    from: "unbalancedbigsmall4_bets",
                    localField: "playerId",
                    foreignField: "playerId",
                    let: { playerId: "$playerId", operatorId: "$operatorId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$paid", true] }, //
                                        { $eq: ["$playerId", "$$playerId"] },
                                        { $eq: ["$operatorId", "$$operatorId"] },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall4_betlogs",
                                localField: "playerId",
                                foreignField: "playerId",
                                let: { roundId: "$roundId", playerId: "$playerId", operatorId: "$operatorId" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$roundId", "$$roundId"] }, //
                                                    { $eq: ["$playerId", "$$playerId"] },
                                                    { $eq: ["$operatorId", "$$operatorId"] },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: "betLogs",
                            },
                        },
                        {
                            $lookup: {
                                from: "unbalancedbigsmall4_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 55 } } },
                    ],
                    as: "montecarlo",
                },
            },
            {
                $set: {
                    lasvegas: "$$REMOVE",
                    marinabay: "$$REMOVE",
                    macau: "$$REMOVE",
                    montecarlo: "$$REMOVE",
                    bet: { $concatArrays: ["$lasvegas", "$marinabay", "$macau", "$montecarlo"] },
                },
            },
            { $unwind: "$bet" },
        ],
    });
})();
