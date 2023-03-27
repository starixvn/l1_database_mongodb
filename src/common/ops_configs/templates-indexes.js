deploy: {
    const dbs   = DBs(db);
    const label = `ops_configs@${dbs.toString()}`;
    if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
    if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

    (global.___colls = global.___colls ?? {})[label] = [
      $Collection(dbs.ops_configs.index_templates),
      $Collection(dbs.ops_configs.summary_templates),
      $Collection(dbs.ops_configs.archive_templates),
    ];

    (global.___idx = global.___idx ?? {})[label] = {
      category_type_U   : $Index({'category': 1, 'type': 1}, {unique: true}),
    };

    (global.___idxs = global.___idxs ?? {})[label] = [
      $Indexes(dbs.ops_configs.index_templates, [
        global.___idx[label].category_type_U,
      ]),
      $Indexes(dbs.ops_configs.summary_templates, [
        global.___idx[label].category_type_U,
      ]),
      $Indexes(dbs.ops_configs.archive_templates, [
        global.___idx[label].category_type_U,
      ]),
    ];
  }
