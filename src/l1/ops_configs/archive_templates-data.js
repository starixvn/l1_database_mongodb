/** L1 L2 -- */
deploy: {
    const dbs   = DBs(db);
    const label = `archive_templates@${dbs.toString()}`;
    if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
    if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

    if (!global.___data?.[label]) loadScript(`../../common/ops_configs/archive_templates-data.js`);
    const data = [
      ...global.___data[label],
    ];

    const del = dbs.ops_configs.archive_templates.deleteMany({});
    const res = dbs.ops_configs.archive_templates.insertMany(data, {ordered: false});
    $Log(`DATA`).info(`ops_configs.archive_templates`, `D-${del.deletedCount} • I-${Object.keys(res.insertedIds).length} • M-0 • U-0`);
  }
