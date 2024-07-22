deploy: {
    const dbs = DBs(db);
    if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
    if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

    const { archiveConfigs } = require("../../modules/ops_configs/archive_configs.cjs");
    const { archiveGameConfigs } = require("../../modules/ops_configs/archive_configs-games.cjs");

    const bulkWrite = [...archiveConfigs, ...archiveGameConfigs].map((doc) => {
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

    const res = dbs.ops_configs.archive_configs.bulkWrite(bulkWrite, { ordered: false });
    $Log(`DATA`).info(`ops_configs.archive_configs`, `#=${res.matchedCount} • I+${res.insertedCount} • U+${res.upsertedCount} • M=${res.modifiedCount} • D-${res.deletedCount}`);
}
