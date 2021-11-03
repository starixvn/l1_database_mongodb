deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
    uid_phien_U         : $Index({'uid': 1, 'phien': 1}, {unique: true}),
    uid_phien_freeBet_U : $Index({'uid': 1, 'phien': 1, 'freeBet': 1}, {unique: true}),
    id                  : $Index({'id': 1}, {unique: true}),
    uid_phien           : $Index({'uid': 1, 'phien': 1}),
    time                : $Index({'time': 1}),
    phien               : $Index({'phien': 1}),
  };

  global.___idxs = [];
}
