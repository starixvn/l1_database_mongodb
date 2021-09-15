deploy: {
  const dbs = DBs(db);
  if (![1].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  loadScript(`../../common/member/member_arc-indexes.js`);
  const idx = {
    ...___idx,
  };
  const idxs = [
    ...___idxs,
  ];
  idxs.forEach(_ => _.deploy());
}
