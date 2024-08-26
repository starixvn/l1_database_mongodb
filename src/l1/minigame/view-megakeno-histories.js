(async () => {
    const { getIdentity, ensureView } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const gameDB = db.getSiblingDB("minigame");

    await ensureView(gameDB, "megakeno_histories", {
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
                    from: "megakeno_ones",
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
                                from: "megakeno_bets",
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
                                from: "megakeno_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 52 } } },
                    ],
                    as: "megakeno",
                },
            },
            {
                $lookup: {
                    from: "megakeno2_ones",
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
                                from: "megakeno2_bets",
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
                                from: "megakeno2_rounds",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 53 } } },
                    ],
                    as: "megakeno2",
                },
            },
            {
                $lookup: {
                    from: "kenomini_ones",
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
                                from: "kenomini_cuocs",
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
                                from: "kenomini_phiens",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 14 } } },
                    ],
                    as: "kenomini",
                },
            },
            {
                $lookup: {
                    from: "kenomini2_ones",
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
                                from: "kenomini2_cuocs",
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
                                from: "kenomini2_phiens",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 15 } } },
                    ],
                    as: "kenomini2",
                },
            },
            {
                $lookup: {
                    from: "kenoeast_ones",
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
                                from: "kenoeast_cuocs",
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
                                from: "kenoeast_phiens",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 16 } } },
                    ],
                    as: "kenoeast",
                },
            },
            {
                $lookup: {
                    from: "kenowest_ones",
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
                                from: "kenowest_cuocs",
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
                                from: "kenowest_phiens",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 17 } } },
                    ],
                    as: "kenowest",
                },
            },
            {
                $lookup: {
                    from: "kenosouth_ones",
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
                                from: "kenosouth_cuocs",
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
                                from: "kenosouth_phiens",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 18 } } },
                    ],
                    as: "kenosouth",
                },
            },
            {
                $lookup: {
                    from: "kenonorth_ones",
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
                                from: "kenonorth_cuocs",
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
                                from: "kenonorth_phiens",
                                localField: "roundId",
                                foreignField: "id",
                                as: "round",
                            },
                        },
                        { $unwind: "$round" },
                        { $set: { gameId: { $literal: 19 } } },
                    ],
                    as: "kenonorth",
                },
            },
            {
                $set: {
                    megakeno: "$$REMOVE",
                    megakeno2: "$$REMOVE",
                    kenomini: "$$REMOVE",
                    kenomini2: "$$REMOVE",
                    kenoeast: "$$REMOVE",
                    kenowest: "$$REMOVE",
                    kenosouth: "$$REMOVE",
                    kenonorth: "$$REMOVE",
                    bet: { $concatArrays: ["$megakeno", "$megakeno2", "$kenomini", "$kenomini2", "$kenoeast", "$kenowest", "$kenosouth", "$kenonorth"] },
                },
            },
            { $unwind: "$bet" },
        ],
    });
})();
