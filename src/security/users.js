(async () => {
    const { getIdentity } = require("../modules/db.cjs");

    const { stage } = await getIdentity(db);

    const adminDB = db.getSiblingDB("admin");
    const { ensureUser } = require("../modules/security/security.cjs");

    if (stage === "active") {
        const activeUsers = require("../modules/security/users-active.cjs");

        for (const user of Object.values(activeUsers)) {
            await ensureUser(adminDB, user);
        }
    }

    if (stage === "archive") {
        const archiveUsers = require("../modules/security/users-archive.cjs");

        for (const user of Object.values(archiveUsers)) {
            await ensureUser(adminDB, user);
        }
    }

    if (stage === "mixed") {
        const mixedUsers = require("../modules/security/users-mixed.cjs");

        for (const user of Object.values(mixedUsers)) {
            await ensureUser(adminDB, user);
        }
    }
})();
