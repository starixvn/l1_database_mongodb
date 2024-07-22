deploy: {
    const dbs = DBs(db);
    const { L, stage } = dbs._mongo._identity;
    if (path.basename(path.resolve(`..`)) != `l${L}`) break deploy;
    if (!["active", "mixed"].includes(stage)) break deploy;

    const { exchangeCodes } = require("../../modules/minigame/minigame-global_configs.cjs");

    const bulkWrite = [exchangeCodes(L)].map((doc) => {
        const { type } = doc;
        const data = Object.assign({}, { _id: { type } }, doc);

        return {
            replaceOne: {
                filter: { type },
                replacement: data,
                upsert: true,
            },
        };
    });

    const res = dbs.minigame.global_configs.bulkWrite(bulkWrite, { ordered: false });
    $Log("DATA").info("minigame.global_configs", `#=${res.matchedCount} • I+${res.insertedCount} • U+${res.upsertedCount} • M=${res.modifiedCount} • D-${res.deletedCount}`);
}
