{
  sit.forEach(instance => {
    /** Authenticate instance */
    auth(instance);

    /** Switch to deploying db */
    const oldDB = global.db;
    global.db = instance.admin;
    global.dbs = DBs(global.db);

    try {
      const logger = $Log(util.inspect(dbs));
      logger.info(`Start `, `Deploying...`);

      loadScript(`init/admin-identity.js`);

      loadScript(`security/roles.js`);
      loadScript(`security/users-${dbs._mongo._identity.stage}.js`);

      loadFolder(`common`);
      loadFolder(`l${dbs._mongo._identity.L}`);

      logger.info(`Finish`, `Deployed.\n`);
    } catch (e) {
      console.error(e);
    }

    /** Switch back to old db */
    global.db = oldDB;
    global.dbs = DBs(global.db);
  });
}
