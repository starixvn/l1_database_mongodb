/** L1 L2 L3 */
deploy: {
  const label = `minigame-admin`;
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if ((!global.___idx?.[label]) || (!global.___idxs?.[label])) loadScript(`../../common/minigame/minigame-admin-indexes.js`);
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    ...global.___idxs[label],
  ];
  idxs.forEach(_ => _.deploy());
}
