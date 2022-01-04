/** L1 L2 L3 */
deploy: {
  const dbs   = DBs(db);
  const label = `summary@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if ((!global.___idx?.[label]) || (!global.___idxs?.[label])) loadScript(`../../common/summary/summary-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    ...global.___idxs[label],
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs   = DBs(db);
  const label = `summary_arc@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if ((!global.___idx?.[label]) || (!global.___idxs?.[label])) loadScript(`../../common/summary/summary-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    ...global.___idxs[label],
  ];
  idxs.forEach(_ => _.deploy());
}
