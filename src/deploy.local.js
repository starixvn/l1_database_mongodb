(async () => {
    const { inspect } = require("util");
    const { log } = require("./modules/utils.cjs");
    const { getIdentity } = require("./modules/db.cjs");

    await loadScript("clear-cache.js");

    for (const dbs of local) {
        const oldDB = global.db;

        try {
            global.db = dbs.admin;
            log("I", "DEPLOY", db, "Starting...");
            global._auth = 3;
            while (global._auth) {
                if (await auth(db)) {
                    global._auth = 0;
                    break;
                }
                --global._auth;
                if (!global._auth) {
                    log("F", "DEPLOY", new Error(`${dbs.toString()} - Failed to authenticate. Aborting...`));
                    return;
                }
            }

            await loadScript("init/admin-identity.js");
            await loadFolder("security");

            const { L, stage } = await getIdentity(db);
            if (L && stage) {
                log("I", "DEPLOY", { L, stage, db });
                await loadFolder(`l${L}`);
            }
        } catch (e) {
            log("E", "DEPLOY", inspect(e, false, null, true));
        } finally {
            log("I", "DEPLOY", db, "Finished.\n");
            global.db = oldDB;
        }
    }
})();
