(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const archiveTemplates = [
        {
            category: "games",
            type: 2,
            dbs: ["hotdog_minigame"],
            data: [
                {
                    id: 0,
                    from: { db: "", postfix: "_rounds" },
                    to: { db: "_arc", postfix: "_rounds_bk" },
                    alias: { time: "endTime" },
                    config: { cutOffsetHours: -24, localField: "id" },
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    childs: [
                        {
                            from: { db: "", postfix: "_fames" },
                            to: { db: "_arc", postfix: "_fames_bk" },
                            config: { foreignField: "roundId" },
                            filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                        },
                        {
                            from: { db: "", postfix: "_freespins" },
                            to: { db: "_arc", postfix: "_freespins_bk" },
                            config: { foreignField: "roundId" },
                            filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                            log: { field: "_freespins", value: "id" },
                        },
                    ],
                    log: { field: "_rounds", value: "id" },
                },
                {
                    id: 1,
                    from: { db: "", postfix: "_freespins" },
                    to: { db: "_arc", postfix: "_freespins_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -8 * 24 },
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                    log: { field: "_freespins", value: "id" },
                },
                {
                    id: 2,
                    from: { db: "", postfix: "_freespins" },
                    to: { db: "_arc", postfix: "_freespins_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -8 * 24, updateOnly: true },
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
                },
                {
                    id: 3,
                    from: { db: "", postfix: "_fames" },
                    to: { db: "_arc", postfix: "_fames_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -8 * 24 },
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                },
                {
                    id: 4,
                    from: { db: "", postfix: "_fames" },
                    to: { db: "_arc", postfix: "_fames_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -8 * 24, updateOnly: true },
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
                },
            ],
            targets: [{ db: "ops_configs", coll: "archive_configs" }],
            __v: 3,
        },
        {
            category: "games",
            type: 6,
            dbs: ["hotdog_minigame"],
            data: [
                {
                    id: 0,
                    from: { db: "", postfix: "_rounds" },
                    to: { db: "_arc", postfix: "_rounds_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24, localField: "id" },
                    childs: [
                        {
                            from: { db: "", postfix: "_results" },
                            to: { db: "_arc", postfix: "_results_bk" },
                            config: { foreignField: "roundId" },
                        },
                        {
                            from: { db: "", postfix: "_bets" },
                            to: { db: "_arc", postfix: "_bets_bk" },
                            config: { foreignField: "roundId" },
                            filter: '{"playerId":{"$ne":null}}',
                            filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                        },
                        {
                            from: { db: "", postfix: "_betlogs" },
                            to: { db: "_arc", postfix: "_betlogs_bk" },
                            config: { foreignField: "roundId" },
                            filter: '{"playerId":{"$ne":null}}',
                            filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                        },
                    ],
                    log: { field: "_rounds", value: "id" },
                },
                {
                    id: 1,
                    from: { db: "", postfix: "_results" },
                    to: { db: "_arc", postfix: "_results_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                },
                {
                    id: 3,
                    from: { db: "", postfix: "_bets" },
                    to: { db: "_arc", postfix: "_bets_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                    filter: '{"playerId":{"$ne":null}}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                },
                {
                    id: 4,
                    from: { db: "", postfix: "_bets" },
                    to: { db: "_arc", postfix: "_bets_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8, updateOnly: true },
                    filter: '{"playerId":null}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
                },
                {
                    id: 5,
                    from: { db: "", postfix: "_betlogs" },
                    to: { db: "_arc", postfix: "_betlogs_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                    filter: '{"playerId":{"$ne":null}}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                },
                {
                    id: 6,
                    from: { db: "", postfix: "_betlogs" },
                    to: { db: "_arc", postfix: "_betlogs_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8, updateOnly: true },
                    filter: '{"playerId":null}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
                },
            ],
            targets: [{ db: "ops_configs", coll: "archive_configs" }],
            __v: 3,
        },
    ];

    /** @type { AnyBulkWriteOperation[] } */
    const bulkWrite = archiveTemplates.map((doc) => {
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

    const opsDB = db.getSiblingDB("ops_configs");
    if (bulkWrite.length) {
        const res = await opsDB.getCollection("archive_templates").bulkWrite(bulkWrite, { ordered: false });
        log("I", "DATA", `[${opsDB.getName()}.archive_templates]`, `• ${stringifyResult(res)}`);
    }
})();
