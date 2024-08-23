(async () => {
    const { inspect } = require("util");
    const { log } = require("./modules/utils.cjs");
    const { getIdentity } = require("./modules/db.cjs");

    await loadScript("clear-cache.js");

    log("I", "DEPLOY", "Starting...");

    for (const dbs of [...pro, ...pro_arc]) {
        const oldDB = global.db;

        try {
            global.db = dbs.admin;

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
            global.db = oldDB;
        }
    }

    log("I", "DEPLOY", "Finished.\n");
})();
