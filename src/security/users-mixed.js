deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

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
    log_arc     : {
      read            : $Role(dbs.log_arc     , `read`          ),
      readWrite       : $Role(dbs.log_arc     , `readWrite`     ),
    },
    member      : {
      read            : $Role(dbs.member      , `read`          ),
      readWrite       : $Role(dbs.member      , `readWrite`     ),
    },
    member_arc  : {
      read            : $Role(dbs.member_arc  , `read`          ),
      readWrite       : $Role(dbs.member_arc  , `readWrite`     ),
    },
    minigame    : {
      read            : $Role(dbs.minigame    , `read`          ),
      readWrite       : $Role(dbs.minigame    , `readWrite`     ),
    },
    minigame_arc: {
      read            : $Role(dbs.minigame_arc, `read`          ),
      readWrite       : $Role(dbs.minigame_arc, `readWrite`     ),
    },
    minigame_rm : {
      read            : $Role(dbs.minigame_rm , `read`          ),
      readWrite       : $Role(dbs.minigame_rm , `readWrite`     ),
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
    summary_arc : {
      read            : $Role(dbs.summary_arc , `read`          ),
      readWrite       : $Role(dbs.summary_arc , `readWrite`     ),
    },
    demo: {
      readWrite       : $Role(dbs.demo        , `readWrite`     ),
    }
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
      /** archive */
      roles.log_arc       .readWrite,
      roles.member_arc    .readWrite,
      roles.minigame_arc  .readWrite,
      roles.minigame_rm   .readWrite,
      roles.summary_arc   .readWrite,

      roles.demo          .readWrite,
    ]),
    $User(dbs.admin, `lmn_backend`, [
      roles.admin         .public,
      /** active */
      roles.log           .readWrite,
      roles.member        .readWrite,
      roles.minigame      .readWrite,
      roles.ops_configs   .readWrite,
      roles.summary       .read,
      /** archive */
      roles.log_arc       .read,
      roles.member_arc    .read,
      roles.minigame_arc  .read,
      roles.minigame_rm   .read,
      roles.summary_arc   .read,

      roles.demo          .readWrite,
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
      /** archive */
      roles.log_arc       .read,
      roles.member_arc    .read,
      roles.minigame_arc  .read,
      roles.minigame_rm   .read,
      roles.summary_arc   .read,

      roles.demo          .read,
    ]),
    $User(dbs.admin, `lmn_summary`, [
      roles.admin         .public,
      roles.Proteus       .readWrite,
      /** active */
      roles.log           .readWrite,
      roles.minigame      .readWrite,
      roles.ops_configs   .read,
      roles.summary       .readWrite,
      /** archive */
      roles.log_arc       .readWrite,
      roles.minigame_arc  .read,
      roles.summary_arc   .readWrite,

      roles.demo          .readWrite,
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
      /** archive */
      roles.log_arc       .read,
      roles.member_arc    .read,
      roles.minigame_arc  .read,
      roles.minigame_rm   .read,
      roles.summary_arc   .read,
    ]),
    $User(dbs.admin, "svc_readonly", [
      roles.admin         .public,
      /** active */
      roles.minigame      .read,
    ]),
  ];
  users.forEach(_ => _.deploy());
}
