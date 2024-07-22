deploy: {
    const dbs = DBs(db);
    if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
    if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

    const { indexTemplates } = require("../../modules/ops_configs/index_templates.cjs");

    const bulkWrite = indexTemplates.map((doc) => {
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

    const res = dbs.ops_configs.index_templates.bulkWrite(bulkWrite, { ordered: false });
    $Log(`DATA`).info(`ops_configs.index_templates`, `#=${res.matchedCount} • I+${res.insertedCount} • U+${res.upsertedCount} • M=${res.modifiedCount} • D-${res.deletedCount}`);
}
