{
  local.forEach(instance => {
    /** Switch to deploying db */
    const oldDB = global.db;
    global.db = instance.admin;
    global.dbs = DBs(global.db);

    try {
      const logger = $Log(util.inspect(dbs));
      logger.info(`Start `, `Deploying...`);

      loadScript(`common/identity.js`);

      loadScript(`security/roles.js`);
      loadScript(`security/users-${dbs._mongo._identity.stage}.js`);

      logger.info(`Finish`, `Deployed.\n`);
    } catch (e) {
      console.error(e);
    }

    /** Switch back to old db */
    global.db = oldDB;
    global.dbs = DBs(global.db);
  });
}
