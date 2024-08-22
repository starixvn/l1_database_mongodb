/** L1 L2 */
deploy: {
    const dbs = DBs(db);
    const label = `archive_config@${dbs.toString()}`;
    if (path.basename(path.resolve("..")) != `l${dbs._mongo?._identity?.L}`) break deploy;
    if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

    if (!global.___data?.[label]) loadScript(`../../common/archive/archive_config-data.js`);
    const data = [...global.___data[label]];

    const del = dbs.archive.archive_config.deleteMany({});
    const res = dbs.archive.archive_config.insertMany(data, { ordered: false });
    $Log(`DATA`).info(`archive.archive_config`, `D-${del.deletedCount} • I-${Object.keys(res.insertedIds).length} • M-0 • U-0`);
}
