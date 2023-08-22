deploy: {
    const dbs   = DBs(db);
    const label = `ops_configs-configs@${dbs.toString()}`;
    if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
    if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

    (global.___colls = global.___colls ?? {})[label] = [
      $Collection(dbs.ops_configs.summary_configs),
      $Collection(dbs.ops_configs.archive_configs),
    ];

    (global.___idx = global.___idx ?? {})[label] = {
      gameConfigs_id_U   : $Index({'gameConfigs': 1, 'id': 1}, {unique: true}),
    };

    (global.___idxs = global.___idxs ?? {})[label] = [
      $Indexes(dbs.ops_configs.summary_configs, [
        global.___idx[label].gameConfigs_id_U,
      ]),
      $Indexes(dbs.ops_configs.archive_configs, [
        global.___idx[label].gameConfigs_id_U,
      ]),
    ];
  }
