deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  global.___idx = {
    TTL     : $Index({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8}),
    exId_U  : $Index({'exId': 1}, {unique: true}),
    time    : $Index({'time': 1}),
  };

  global.___idxs = [
    $Indexes(dbs.minigame.exchange_rates, [
      ___idx.TTL,
      ___idx.exId_U,
      ___idx.time,
    ]),
  ];

  /** Settings */
  { /** exchange_rates */
    const conf = {
      coll: `exchange_rates`,
      size: 1024**4,
    };
    let stats = {};

    stats = dbs.minigame[conf.coll].stats();
    if (!stats.storageSize || !stats.nindexes) {
      dbs.minigame.createCollection(conf.coll, {capped: true, size: conf.size});
      $Log(`COLL`).info(`minigame.${conf.coll}`, `Collection CREATED`);
    }
    stats = dbs.minigame[conf.coll].stats();
    if (!stats.capped || stats.maxSize != conf.size) {
      dbs.minigame.runCommand({convertToCapped: conf.coll, size: conf.size});
      $Log(`COLL`).info(`minigame.${conf.coll}`, `Collection is converted to CAPPED with config`);
      $Log(`COLL`).info(`minigame.${conf.coll}`, `  ${util.inspect(conf)}`);
    }
    stats = dbs.minigame[conf.coll].stats();
    if (!stats.capped) $Log(`AUDIT`).info(`minigame.${conf.coll}`, `Collection must be CAPPED`);
    if (stats.maxSize != conf.size) $Log(`AUDIT`).info(`minigame.${conf.coll}`, `Collection size must be ${conf.size}`);
  }
}
