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

    const bulkWrite = data.map(({ category, type, ...restData }) => ({
      updateOne: {
        filter: { category, type },
        update: { $set: restData },
        upsert: true,
      }
    }))
    const res = dbs.ops_configs.archive_templates.bulkWrite(bulkWrite, {ordered: false});
    $Log(`DATA`).info(`ops_configs.archive_templates`, `#-${res.matchedCount} • D-${res.deletedCount} • I-${res.insertedCount} • M-${res.modifiedCount} • U-${res.upsertedCount}`);
  }
