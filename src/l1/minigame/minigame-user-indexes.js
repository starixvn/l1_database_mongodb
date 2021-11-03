/** L1 L2 L3 */
deploy: {
  const dbs = DBs(db);
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  loadScript(`../../common/minigame/minigame-user-indexes.js`);

  const colls = [
    ...___colls,
  ];
  colls.forEach(_ => { _.create(); _.validate(); });

  const idx = {
    ...___idx,
  };
  const idxs = [
    ...___idxs,
  ];
  idxs.forEach(_ => _.deploy());
}
