deploy: {
    const dbs = DBs(db);
    if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
    if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

    const archiveTemplates = [
        {
            category: "games",
            type: 6,
            data: [
                {
                    id: 0,
                    from: { db: "minigame", postfix: "_rounds" },
                    to: { db: "minigame_arc", postfix: "_rounds_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24, localField: "id" },
                    childs: [
                        {
                            from: { db: "minigame", postfix: "_results" },
                            to: { db: "minigame_arc", postfix: "_results_bk" },
                            config: { foreignField: "roundId" },
                        },
                        {
                            from: { db: "minigame", postfix: "_bets" },
                            to: { db: "minigame_arc", postfix: "_bets_bk" },
                            config: { foreignField: "roundId" },
                            filter: '{"playerId":{"$ne":null}}',
                            filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                        },
                        {
                            from: { db: "minigame", postfix: "_betlogs" },
                            to: { db: "minigame_arc", postfix: "_betlogs_bk" },
                            config: { foreignField: "roundId" },
                            filter: '{"playerId":{"$ne":null}}',
                            filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                        },
                    ],
                    log: { field: "_rounds", value: "id" },
                },
                {
                    id: 1,
                    from: { db: "minigame", postfix: "_results" },
                    to: { db: "minigame_arc", postfix: "_results_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                },
                {
                    id: 3,
                    from: { db: "minigame", postfix: "_bets" },
                    to: { db: "minigame_arc", postfix: "_bets_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                    filter: '{"playerId":{"$ne":null}}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                },
                {
                    id: 4,
                    from: { db: "minigame", postfix: "_bets" },
                    to: { db: "minigame_arc", postfix: "_bets_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8, updateOnly: true },
                    filter: '{"playerId":null}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
                },
                {
                    id: 5,
                    from: { db: "minigame", postfix: "_betlogs" },
                    to: { db: "minigame_arc", postfix: "_betlogs_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8 },
                    filter: '{"playerId":{"$ne":null}}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":{"$ne":null}}' },
                },
                {
                    id: 6,
                    from: { db: "minigame", postfix: "_betlogs" },
                    to: { db: "minigame_arc", postfix: "_betlogs_bk" },
                    alias: { time: "time" },
                    config: { cutOffsetHours: -24 * 8, updateOnly: true },
                    filter: '{"playerId":null}',
                    filterConfigs: { __brand: "internal", filterExpr: '{"playerId":null}' },
                },
            ],
            targets: [{ db: "ops_configs", coll: "archive_configs" }],
        },
    ];

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

    const res = dbs.ops_configs.archive_templates.bulkWrite(bulkWrite, { ordered: false });
    $Log(`DATA`).info(`ops_configs.archive_templates`, `#=${res.matchedCount} • I+${res.insertedCount} • U+${res.upsertedCount} • M=${res.modifiedCount} • D-${res.deletedCount}`);
}
