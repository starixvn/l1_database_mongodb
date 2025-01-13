(async () => {
    const { getIdentity } = require("../modules/db.cjs");

    const { L, stage } = await getIdentity(db);

    if (!["active", "archive", "mixed"].includes(stage)) return;
    if (typeof L !== "number" || L === 5) return;

    const adminDB = db.getSiblingDB("admin");
    const { ensureRole } = require("../modules/security/security.cjs");

    const baseRoles = require("../modules/security/role-base-defs.cjs");
    for (const role of Object.values(baseRoles)) {
        await ensureRole(adminDB, role);
    }

    if (stage === "active" || stage === "mixed") {
        const activeRoles = require("../modules/security/role-active-defs.cjs");
        for (const role of Object.values(activeRoles)) {
            await ensureRole(adminDB, role);
        }
    }

    if (stage === "archive" || stage === "mixed") {
        const archiveRoles = require("../modules/security/role-archive-defs.cjs");
        for (const role of Object.values(archiveRoles)) {
            await ensureRole(adminDB, role);
        }
    }
})();
