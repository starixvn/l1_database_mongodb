/** L1 L2 L3 */
deploy: {
  const label = `member`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if ((!global.___idx?.[label]) || (!global.___idxs?.[label])) loadScript(`../../common/member/member-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    ...global.___idxs[label],
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const label = `member_arc`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if ((!global.___idx?.[label]) || (!global.___idxs?.[label])) loadScript(`../../common/member/member_arc-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    ...global.___idxs[label],
  ];
  idxs.forEach(_ => _.deploy());
}
