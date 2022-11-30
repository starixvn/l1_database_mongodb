/** -- -- L3 */
deploy: {
  const dbs   = DBs(db);
  const label = `log@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if ((!global.___colls?.[label]) || (!global.___idx?.[label]) || (!global.___idxs?.[label])) loadScript(`../../common/log/log-indexes.js`);
  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  const colls = [
    ...global.___colls[label],
    $Collection(dbs.log.enter_portals , {storageEngine}),
    $Collection(dbs.log.signins       , {storageEngine}),
  ];
  colls.forEach(_ => { _.create(); _.validate(); });
  const idx = {
    ...global.___idx[label],
    memberId: $Index({'memberAuth.memberId': 1}),
  };
  const idxs = [
    ...global.___idxs[label],
    $Indexes(dbs.log.enter_portals, [
      idx.TTL,
      idx.requestTimeStamp,
      idx.logTimeStamp,
    ]),
    $Indexes(dbs.log.signins, [
      idx.TTL,
      idx.requestTimeStamp,
      idx.logTimeStamp,
      idx.memberId,
    ]),
  ];
  idxs.forEach(_ => _.deploy());
}

deploy: {
  const dbs   = DBs(db);
  const label = `log_arc@${dbs.toString()}`;
  if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  if ((!global.___colls?.[label]) || (!global.___idx?.[label]) || (!global.___idxs?.[label])) loadScript(`../../common/log/log_arc-indexes.js`);
  const storageEngine = {wiredTiger: {configString: 'block_compressor=zstd'}};
  const colls = [
    ...global.___colls[label],
    $Collection(dbs.log_arc.enter_portals_bk, {storageEngine}),
    $Collection(dbs.log_arc.signins_bk      , {storageEngine}),
  ];
  colls.forEach(_ => { _.create(); _.validate(); });
  const idx = {
    ...global.___idx[label],
  };
  const idxs = [
    ...global.___idxs[label],
    $Indexes(dbs.log_arc.enter_portals_bk, [
      idx.requestTimeStamp,
    ]),
    $Indexes(dbs.log_arc.signins_bk, [
      idx.requestTimeStamp,
    ]),
  ];
  idxs.forEach(_ => _.deploy());
}
