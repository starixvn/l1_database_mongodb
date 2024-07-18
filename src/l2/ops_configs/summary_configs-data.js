deploy: {
    const dbs = DBs(db);
    if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
    if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

    const { summaryConfigs } = require("../../modules/ops_configs/summary_configs.cjs");

    const bulkWrite = summaryConfigs.map((doc) => {
        const { gameConfigs, category, type } = doc;
        const data = Object.assign({}, { _id: { gameConfigs, category, type } }, doc);

        return {
            replaceOne: {
                filter: { gameConfigs, category, type },
                replacement: data,
                upsert: true,
            },
        };
    });

    const res = dbs.ops_configs.summary_configs.bulkWrite(bulkWrite, { ordered: false });
    $Log(`DATA`).info(`ops_configs.summary_configs`, `#=${res.matchedCount} • I+${res.insertedCount} • U+${res.upsertedCount} • M=${res.modifiedCount} • D-${res.deletedCount}`);
}
