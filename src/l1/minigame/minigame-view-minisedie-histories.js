(async () => {
    const { getIdentity, ensureView } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve(`..`)) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const gameDB = db.getSiblingDB("minigame");

    await ensureView(gameDB, "minisedie_histories", {
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
                    from: "minisedie_cuocs",
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
                                from: "minisedie_phiens",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 9 } } },
                    ],
                    as: "minisedie",
                },
            },
            {
                $lookup: {
                    from: "minisedie2_bets",
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
                                from: "minisedie2_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 56 } } },
                    ],
                    as: "minisedie2",
                },
            },
            {
                $lookup: {
                    from: "minisedie3_bets",
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
                                from: "minisedie3_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 57 } } },
                    ],
                    as: "minisedie3",
                },
            },
            {
                $lookup: {
                    from: "minisedie4_bets",
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
                                from: "minisedie4_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 58 } } },
                    ],
                    as: "minisedie4",
                },
            },
            {
                $set: {
                    minisedie: "$$REMOVE",
                    minisedie2: "$$REMOVE",
                    minisedie3: "$$REMOVE",
                    minisedie4: "$$REMOVE",
                    bet: { $concatArrays: ["$minisedie", "$minisedie2", "$minisedie3", "$minisedie4"] },
                },
            },
            { $unwind: "$bet" },
        ],
    });
})();
