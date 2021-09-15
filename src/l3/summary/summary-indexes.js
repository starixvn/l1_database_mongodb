deploy: {
  const dbs = DBs(db);
  if (![3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  loadScript(`../../common/summary/summary-indexes.js`);
  const idx = {
    ...___idx,
  };
  const idxs = [
    ...___idxs,
  ];
  idxs.forEach(_ => _.deploy());
}
