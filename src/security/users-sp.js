(async () => {
    const { getIdentity } = require("../modules/db.cjs");

    const { L, stage } = await getIdentity(db);

    if (!["active", "archive", "mixed"].includes(stage)) return;
    if (!(L === 5)) return;

    const adminDB = db.getSiblingDB("admin");
    const { ensureUser } = require("../modules/security/security.cjs");

    const baseUsers = require("../modules/security/users-base.cjs");
    for (const user of Object.values(baseUsers)) {
        await ensureUser(adminDB, user);
    }

    const userModulePath = `../modules/security/users-${stage}-sp.cjs`;
    if (!fs.existsSync(userModulePath)) {
        throw new Error(`Path does not exists: "${userModulePath}"`);
    }
    // eslint-disable-next-line security/detect-non-literal-require
    const users = require(userModulePath);
    for (const user of Object.values(users)) {
        await ensureUser(adminDB, user);
    }
})();
