(async () => {
    const { log } = require("./modules/utils.cjs");
    const { getIdentity } = require("./modules/db.cjs");

    await loadScript("clear-cache.js");

    global._auth = 3;
    while (global._auth) {
        try {
            await auth(db);
            global._auth = 0;
        } catch {
            global._auth--;
        }
    }

    log("I", "DEPLOY", "Starting...");

    await loadScript("init/admin-identity.js");
    await loadFolder("security");

    const { L, stage } = await getIdentity(db);
    if (L && stage) {
        log("I", "DEPLOY", { L, stage, db });
        await loadFolder(`l${L}`);
    }

    log("I", "DEPLOY", "Finished.\n");
})();
