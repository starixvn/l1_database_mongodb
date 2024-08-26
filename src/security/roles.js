(async () => {
    const { getIdentity } = require("../modules/db.cjs");

    const { stage } = await getIdentity(db);
    if (!["active", "archive", "mixed"].includes(stage)) return;

    const adminDB = db.getSiblingDB("admin");
    const roleDefinitions = require("../modules/security/role-definitions.cjs");
    const { ensureRole } = require("../modules/security/security.cjs");

    for (const role of Object.values(roleDefinitions)) {
        await ensureRole(adminDB, role);
    }
})();
