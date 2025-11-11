(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { _id, L, stage } = await getIdentity(db);
    if (/Main$/.test(_id)) return;
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const collections = [
        {
            _id: "game_configs",
            pipeline: EJSON.stringify(
                /** @type {CollectionAggregationPipeline} */ ([
                    { $project: { _id: 0, p: "$$ROOT" } },
                    {
                        $lookup: {
                            from: "orig_game_configs",
                            localField: "p.gameId",
                            foreignField: "gameId",
                            as: "o",
                        },
                    },
                    { $unwind: { path: "$o", preserveNullAndEmptyArrays: true } },
                    { $set: { n: { $mergeObjects: ["$o", "$p"] } } },
                    {
                        $set: {
                            "n._id": { $ifNull: ["$o._id", "$$REMOVE"] },
                            "n.hour_maxbot": {
                                $map: {
                                    input: "$n.hour_maxbot",
                                    as: "i",
                                    in: { $round: [{ $divide: ["$$i", 10] }, 6] },
                                },
                            },
                        },
                    },
                    { $replaceWith: "$n" },
                    { $merge: { into: { db: "sync", coll: "test_game_configs" } } },
                ]),
            ),
        },
        {
            _id: "currency_groups",
            pipeline: EJSON.stringify(
                /** @type {CollectionAggregationPipeline} */ ([
                    { $project: { _id: 0, p: "$$ROOT" } },
                    {
                        $lookup: {
                            from: "orig_currency_groups",
                            localField: "p.name",
                            foreignField: "name",
                            let: { p: "$p.partnerId" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$partnerId", "$$p"] } } }, // -
                            ],
                            as: "o",
                        },
                    },
                    { $unwind: { path: "$o", preserveNullAndEmptyArrays: true } },
                    { $set: { n: { $mergeObjects: ["$o", "$p"] } } },
                    {
                        $set: {
                            "n._id": { $ifNull: ["$o._id", "$$REMOVE"] },
                        },
                    },
                    { $replaceWith: "$n" },
                    { $merge: { into: { db: "sync", coll: "test_currency_groups" } } },
                ]),
            ),
        },
        {
            _id: "currencies",
            pipeline: EJSON.stringify(
                /** @type {CollectionAggregationPipeline} */ ([
                    { $project: { _id: 0, p: "$$ROOT" } },
                    {
                        $lookup: {
                            from: "currency_groups",
                            localField: "p.groupId",
                            foreignField: "_id",
                            pipeline: [
                                { $project: { _id: 0, name: 1, partnerId: 1 } }, // -
                            ],
                            as: "__g",
                        },
                    },
                    { $unwind: "$__g" },
                    { $set: { __g: "$$REMOVE", "p._groupName": "$__g.name", "p.partnerId": "$__g.partnerId" } },
                    {
                        $lookup: {
                            from: "orig_currency_groups",
                            localField: "p._groupName",
                            foreignField: "name",
                            let: { p: "$p.partnerId" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$partnerId", "$$p"] } } }, // -
                                { $project: { _id: 1 } },
                            ],
                            as: "__cg",
                        },
                    },
                    { $unwind: "$__cg" },
                    { $set: { __cg: "$$REMOVE", "p._groupId": "$__cg._id" } },
                    {
                        $lookup: {
                            from: "orig_currencies",
                            localField: "p.name",
                            foreignField: "name",
                            let: { g: "$p._groupId" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$groupId", "$$g"] } } }, // -
                            ],
                            as: "o",
                        },
                    },
                    { $unwind: { path: "$o", preserveNullAndEmptyArrays: true } },
                    { $set: { n: { $mergeObjects: ["$o", "$p"] } } },
                    {
                        $set: {
                            "n._id": { $ifNull: ["$o._id", "$$REMOVE"] },
                            "n.groupId": { $ifNull: ["$o.groupId", "$p._groupId"] },
                            "n._groupId": "$$REMOVE",
                            "n._groupName": "$$REMOVE",
                        },
                    },
                    { $replaceWith: "$n" },
                    { $merge: { into: { db: "sync", coll: "test_currencies" } } },
                ]),
            ),
        },
        {
            _id: "currency_group_games",
            pipeline: EJSON.stringify(
                /** @type {CollectionAggregationPipeline} */ ([
                    { $project: { _id: 0, p: "$$ROOT" } },
                    {
                        $lookup: {
                            from: "currency_groups",
                            localField: "p.groupId",
                            foreignField: "_id",
                            pipeline: [
                                { $project: { _id: 0, name: 1, partnerId: 1 } }, // -
                            ],
                            as: "__g",
                        },
                    },
                    { $unwind: "$__g" },
                    { $set: { __g: "$$REMOVE", "p._groupName": "$__g.name", "p._partnerId": "$__g.partnerId" } },
                    {
                        $lookup: {
                            from: "orig_currency_groups",
                            localField: "p._groupName",
                            foreignField: "name",
                            let: { p: "$p._partnerId" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$partnerId", "$$p"] } } }, // -
                                { $project: { _id: 1 } },
                            ],
                            as: "__cg",
                        },
                    },
                    { $unwind: "$__cg" },
                    { $set: { __cg: "$$REMOVE", "p._groupId": "$__cg._id" } },
                    {
                        $lookup: {
                            from: "orig_currency_group_games",
                            localField: "p.gameId",
                            foreignField: "gameId",
                            let: { g: "$p._groupId" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$groupId", "$$g"] } } }, // -
                            ],
                            as: "o",
                        },
                    },
                    { $unwind: { path: "$o", preserveNullAndEmptyArrays: true } },
                    { $set: { n: { $mergeObjects: ["$o", "$p"] } } },
                    {
                        $set: {
                            "n._id": { $ifNull: ["$o._id", "$$REMOVE"] },
                            "n.groupId": { $ifNull: ["$o.groupId", "$p._groupId"] },
                            "n._groupId": "$$REMOVE",
                            "n._groupName": "$$REMOVE",
                            "n._partnerId": "$$REMOVE",
                        },
                    },
                    { $replaceWith: "$n" },
                    { $merge: { into: { db: "sync", coll: "test_currency_group_games" } } },
                ]),
            ),
        },
        {
            _id: "chips",
            pipeline: EJSON.stringify(
                /** @type {CollectionAggregationPipeline} */ ([
                    { $project: { _id: 0, p: "$$ROOT" } },
                    {
                        $lookup: {
                            from: "orig_chips",
                            localField: "p.value",
                            foreignField: "value",
                            as: "o",
                        },
                    },
                    { $unwind: { path: "$o", preserveNullAndEmptyArrays: true } },
                    { $set: { n: { $mergeObjects: ["$o", "$p"] } } },
                    {
                        $set: {
                            "n._id": { $ifNull: ["$o._id", "$$REMOVE"] }, // -
                        },
                    },
                    { $replaceWith: "$n" },
                    { $merge: { into: { db: "sync", coll: "test_chips" } } },
                ]),
            ),
        },
    ];

    /** @type { AnyBulkWriteOperation[] } */
    const bulkWrite = collections.map((data) => {
        const { _id } = data;

        return {
            replaceOne: {
                filter: { _id },
                replacement: data,
                upsert: true,
            },
        };
    });

    bulkWrite.push({
        deleteMany: {
            filter: {
                _id: { $nin: collections.map(({ _id }) => _id) },
            },
        },
    });

    const syncDB = db.getSiblingDB("sync");
    {
        const res = await syncDB.getCollection("collections").bulkWrite(bulkWrite, { ordered: false });
        log("I", "DATA", `[${syncDB.getName()}.collections]`, `• ${stringifyResult(res)}`);
    }
})();
