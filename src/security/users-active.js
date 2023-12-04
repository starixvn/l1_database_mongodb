deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const roles = {
    admin       : {
      clusterMonitor  : $Role(dbs.admin       , `clusterMonitor`),
      owner           : $Role(dbs.admin       , `dbOwner`       ),
      monitorSystem   : $Role(dbs.admin       , `monitorSystem` ),
      public          : $Role(dbs.admin       , `public`        ),
      readSystem      : $Role(dbs.admin       , `readSystem`    ),
      root            : $Role(dbs.admin       , `root`          ),
    },
    archive     : {
      read            : $Role(dbs.archive     , `read`          ),
    },
    config      : {
      owner           : $Role(dbs.config      , `dbOwner`       ),
    },
    local       : {
      owner           : $Role(dbs.local       , `dbOwner`       ),
    },
    log         : {
      read            : $Role(dbs.log         , `read`          ),
      readWrite       : $Role(dbs.log         , `readWrite`     ),
    },
    member      : {
      read            : $Role(dbs.member      , `read`          ),
      readWrite       : $Role(dbs.member      , `readWrite`     ),
    },
    minigame    : {
      read            : $Role(dbs.minigame    , `read`          ),
      readWrite       : $Role(dbs.minigame    , `readWrite`     ),
    },
    ops_configs : {
      read            : $Role(dbs.ops_configs , `read`          ),
      readWrite       : $Role(dbs.ops_configs , `readWrite`     ),
    },
    Proteus     : {
      read            : $Role(dbs.Proteus     , `read`          ),
      readWrite       : $Role(dbs.Proteus     , `readWrite`     ),
    },
    schema      : {
      read            : $Role(dbs.schema      , `read`          ),
      readWrite       : $Role(dbs.schema      , `readWrite`     ),
    },
    summary     : {
      read            : $Role(dbs.summary     , `read`          ),
      readWrite       : $Role(dbs.summary     , `readWrite`     ),
    },
  };

  const users = [
    $User(dbs.admin, `billy.bui`, [
      roles.admin         .root,
      roles.admin         .owner,
      roles.config        .owner,
      roles.local         .owner,
    ]),
    $User(dbs.admin, `lmn_archive`, [
      roles.admin         .public,
      /** active */
      roles.archive       .read,
      roles.log           .readWrite,
      roles.member        .readWrite,
      roles.minigame      .readWrite,
      roles.ops_configs   .read,
      roles.summary       .readWrite,
    ]),
    $User(dbs.admin, `lmn_backend`, [
      roles.admin         .public,
      /** active */
      roles.log           .readWrite,
      roles.member        .readWrite,
      roles.minigame      .readWrite,
      roles.ops_configs   .readWrite,
      roles.summary       .read,
    ]),
    $User(dbs.admin, `lmn_backup`, [
      roles.admin         .readSystem,
    ]),
    $User(dbs.admin, `lmn_readonly`, [
      roles.admin         .public,
      roles.Proteus       .read,
      /** active */
      roles.archive       .read,
      roles.log           .read,
      roles.member        .read,
      roles.minigame      .read,
      roles.ops_configs   .read,
      roles.summary       .read,
    ]),
    $User(dbs.admin, `lmn_summary`, [
      roles.admin         .public,
      roles.Proteus       .readWrite,
      /** active */
      roles.log           .readWrite,
      roles.minigame      .readWrite,
      roles.ops_configs   .read,
      roles.summary       .readWrite,
    ]),
    $User(dbs.admin, `mongodb_exporter`, [
      roles.admin         .clusterMonitor,
      roles.admin         .monitorSystem,
    ]),
    $User(dbs.admin, `mongosqld`, [
      roles.admin         .public,
      roles.Proteus       .read,
      roles.schema        .read,
      /** active */
      roles.archive       .read,
      roles.log           .read,
      roles.member        .read,
      roles.minigame      .read,
      roles.ops_configs   .read,
      roles.summary       .read,
    ]),
    $User(dbs.admin, "svc_readonly", [
      roles.admin         .public,
      /** active */
      roles.minigame      .read,
    ]),
  ];
  users.forEach(_ => _.deploy());
}
