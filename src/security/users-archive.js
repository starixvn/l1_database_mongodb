deploy: {
  const dbs = DBs(db);
  if (![1, 2, 3].includes(dbs._mongo?._identity?.L)) break deploy;
  if (!["archive"].includes(dbs._mongo?._identity?.stage)) break deploy;

  const users = [
    $User(dbs.admin, `billy.bui`, [
      $Role(dbs.admin       , `root`          ),
      $Role(dbs.admin       , `dbOwner`       ),
      $Role(dbs.local       , `dbOwner`       ),
      $Role(dbs.config      , `dbOwner`       ),
    ]),
    $User(dbs.admin, `lmn_archive`, [
      $Role(dbs.admin       , `public`        ),
      $Role(dbs.log_arc     , `readWrite`     ),
      $Role(dbs.member_arc  , `readWrite`     ),
      $Role(dbs.minigame_arc, `readWrite`     ),
      $Role(dbs.minigame_rm , `readWrite`     ),
    ]),
    $User(dbs.admin, `lmn_backend`, [
      $Role(dbs.admin       , `public`        ),
      $Role(dbs.log_arc     , `read`          ),
      $Role(dbs.member_arc  , `read`          ),
      $Role(dbs.minigame_arc, `read`          ),
      $Role(dbs.minigame_rm , `read`          ),
      $Role(dbs.summary_arc , `read`          ),
    ]),
    $User(dbs.admin, `lmn_backup`, [
      $Role(dbs.admin       , `public`        ),
      $Role(dbs.admin       , `readSystem`    ),
    ]),
    $User(dbs.admin, `lmn_readonly`, [
      $Role(dbs.admin       , `public`        ),
      $Role(dbs.log_arc     , `read`          ),
      $Role(dbs.member_arc  , `read`          ),
      $Role(dbs.minigame_arc, `read`          ),
      $Role(dbs.minigame_rm , `read`          ),
      $Role(dbs.summary_arc , `read`          ),
    ]),
    $User(dbs.admin, `lmn_summary`, [
      $Role(dbs.admin       , `public`        ),
      $Role(dbs.log_arc     , `readWrite`     ),
      $Role(dbs.minigame_arc, `read`          ),
      $Role(dbs.summary_arc , `readWrite`     ),
    ]),
    $User(dbs.admin, `mongodb_exporter`, [
      $Role(dbs.admin       , `clusterMonitor`),
      $Role(dbs.admin       , `monitorSystem` ),
    ]),
    $User(dbs.admin, `mongosqld`, [
      $Role(dbs.admin       , `public`        ),
      $Role(dbs.log_arc     , `read`          ),
      $Role(dbs.member_arc  , `read`          ),
      $Role(dbs.minigame_arc, `read`          ),
      $Role(dbs.minigame_rm , `read`          ),
      $Role(dbs.schema      , `readWrite`     ),
      $Role(dbs.summary_arc , `read`          ),
    ]),
  ];
  users.forEach(_ => _.deploy());
}
