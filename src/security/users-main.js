{
  const dbs = DBs(db);
  const users = [
    $User(dbs.admin, `billy.bui`, [
      $Role(dbs.admin       , `root`          ),
      $Role(dbs.admin       , `dbOwner`       ),
      $Role(dbs.local       , `dbOwner`       ),
      $Role(dbs.config      , `dbOwner`       ),
    ]),
    $User(dbs.admin, `lmn_archive`, [
      $Role(dbs.archive     , `read`          ),
      $Role(dbs.log         , `readWrite`     ),
      $Role(dbs.member      , `readWrite`     ),
      $Role(dbs.minigame    , `readWrite`     ),
    ]),
    $User(dbs.admin, `lmn_backend`, [
      $Role(dbs.log         , `readWrite`     ),
      $Role(dbs.member      , `readWrite`     ),
      $Role(dbs.minigame    , `readWrite`     ),
      $Role(dbs.summary     , `read`          ),
    ]),
    $User(dbs.admin, `lmn_backup`, [
      $Role(dbs.admin       , `readSystem`    ),
    ]),
    $User(dbs.admin, `lmn_readonly`, [
      $Role(dbs.archive     , `read`          ),
      $Role(dbs.log         , `read`          ),
      $Role(dbs.member      , `read`          ),
      $Role(dbs.minigame    , `read`          ),
      $Role(dbs.Proteus     , `read`          ),
      $Role(dbs.summary     , `read`          ),
    ]),
    $User(dbs.admin, `lmn_summary`, [
      $Role(dbs.log         , `readWrite`     ),
      $Role(dbs.minigame    , `readWrite`     ),
      $Role(dbs.Proteus     , `readWrite`     ),
      $Role(dbs.summary     , `readWrite`     ),
    ]),
    $User(dbs.admin, `mongodb_exporter`, [
      $Role(dbs.admin       , `clusterMonitor`),
      $Role(dbs.admin       , `monitorSystem` ),
    ]),
    $User(dbs.admin, `mongosqld`, [
      $Role(dbs.archive     , `read`          ),
      $Role(dbs.log         , `read`          ),
      $Role(dbs.member      , `read`          ),
      $Role(dbs.minigame    , `read`          ),
      $Role(dbs.Proteus     , `read`          ),
      $Role(dbs.schema      , `readWrite`     ),
      $Role(dbs.summary     , `read`          ),
    ]),
  ];
  users.forEach(_ => _.deploy());
}
