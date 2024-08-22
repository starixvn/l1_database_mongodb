/** L1 L2 */
deploy: {
    const dbs = DBs(db);
    const label = `summary-summary_configs@${dbs.toString()}`;
    if (path.basename(path.resolve("..")) != `l${dbs._mongo?._identity?.L}`) break deploy;
    if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

    if (!global.___data?.[label]) loadScript(`../../common/summary/summary-summary_configs-data.js`);
    const data = [...global.___data[label]];

    const del = dbs.summary.summary_configs.deleteMany({});
    const res = dbs.summary.summary_configs.insertMany(data, { ordered: false });
    $Log(`DATA`).info(`summary.summary_configs`, `D-${del.deletedCount} • I-${Object.keys(res.insertedIds).length} • M-0 • U-0`);
}
