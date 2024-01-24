/** L1 L2 */
deploy: {
  const dbs   = DBs(db);
  const label = `schema@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if (!global.___data?.[label]) loadScript(`../../common/schema/schema-data.js`);
  const data = {
    ...global.___data[label],
  };

  Object.keys(data).forEach(_ => {
    const res = dbs.schema[_].bulkWrite([data[_]].flat(Infinity), {ordered: false});
    $Log(`DATA`).info(`schema.${_}`, `D-${res.deletedCount ?? 0} • I-${(res.insertedCount ?? 0) + (res.upsertedCount ?? 0)} • M-${res.matchedCount ?? 0} • U-${res.modifiedCount ?? 0}`);
  });
}
