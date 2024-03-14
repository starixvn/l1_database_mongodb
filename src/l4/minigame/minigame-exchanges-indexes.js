deploy: {
  const dbs   = DBs(db);
  const label = `minigame-exchanges@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if ((!global.___colls?.[label]) || (!global.___idx?.[label]) || (!global.___idxs?.[label])) loadScript(`../../common/minigame/minigame-exchanges-indexes.js`);

  const colls = [
    ...global.___colls[label],
  ];
  colls.forEach(_ => { _.create(); _.validate(); });

  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    ...global.___idxs[label],
  ];
  idxs.forEach(_ => _.deploy());
}
