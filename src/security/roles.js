deploy: {
  const dbs = DBs(db);
  if (![1, 2, 4].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["active", "archive", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const backupActions = [
    `fsync`,
    `getCmdLineOpts`,
    `replSetGetStatus`,
    `unlock`,
  ];

  const roles = [
    $Role(dbs.admin, `public`, [], [
      $Privilege(dbs.admin.identity           , $Privilege.actions.read),
    ]),
    $Role(dbs.admin, `monitorSystem`, [], [
      $Privilege(dbs.admin.system.keys        , $Privilege.actions.monitor),
      $Privilege(dbs.admin.system.roles       , $Privilege.actions.monitor),
      $Privilege(dbs.admin.system.users       , $Privilege.actions.monitor),
      $Privilege(dbs.admin.system.version     , $Privilege.actions.monitor),
      $Privilege(dbs.config.system.sessions   , $Privilege.actions.monitor),
      $Privilege(dbs.local.system.profile     , $Privilege.actions.monitor),
      $Privilege(dbs.local.system.replset     , $Privilege.actions.monitor),
      $Privilege(dbs.local.system.rollback.id , $Privilege.actions.monitor),
      $Privilege(dbs._mongo                   , $Privilege.actions.monitor),
      $Privilege(dbs._.system.js              , $Privilege.actions.monitor),
      $Privilege(dbs._.system.profile         , $Privilege.actions.monitor),
    ]),
    $Role(dbs.admin, `readSystem`, [
      $Role(dbs.admin, `readAnyDatabase`),
    ], [
      $Privilege({cluster: true}              , backupActions          ),
      $Privilege(dbs.admin                    , $Privilege.actions.read),
      $Privilege(dbs.admin.system.keys        , $Privilege.actions.read),
      $Privilege(dbs.admin.system.profile     , $Privilege.actions.read),
      $Privilege(dbs.admin.system.roles       , $Privilege.actions.read),
      $Privilege(dbs.admin.system.users       , $Privilege.actions.read),
      $Privilege(dbs.admin.system.version     , $Privilege.actions.read),
      $Privilege(dbs.admin.system.views       , $Privilege.actions.read),
      $Privilege(dbs.config                   , $Privilege.actions.read, $Privilege.actions.list),
      $Privilege(dbs.config.system.profile    , $Privilege.actions.read),
      $Privilege(dbs.config.system.sessions   , $Privilege.actions.read),
      $Privilege(dbs.local                    , $Privilege.actions.read, $Privilege.actions.list, $Privilege.actions.monitor),
      $Privilege(dbs.local.system.profile     , $Privilege.actions.read),
      $Privilege(dbs.local.system.replset     , $Privilege.actions.read),
      $Privilege(dbs.local.system.rollback.id , $Privilege.actions.read),
    ]),
  ];
  roles.forEach(_ => _.deploy());
}
