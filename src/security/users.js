(async () => {
    const { getIdentity } = require("../modules/db.cjs");

    const { L, stage } = await getIdentity(db);

    const adminDB = db.getSiblingDB("admin");
    const { ensureUser } = require("../modules/security/security.cjs");

    if (typeof L !== "number" || L === 5) {
        return;
    }

    const userModulePath = `../modules/security/users-${stage}.cjs`;

    if (!fs.existsSync(userModulePath)) {
        throw new Error(`Path does not exists: "${userModulePath}"`);
    }

    // eslint-disable-next-line security/detect-non-literal-require
    const users = require(userModulePath);

    for (const user of Object.values(users)) {
        await ensureUser(adminDB, user);
    }
})();

(async () => {
    const { getIdentity } = require("../modules/db.cjs");

    const { L, stage } = await getIdentity(db);

    const adminDB = db.getSiblingDB("admin");
    const { ensureUser } = require("../modules/security/security.cjs");

    if (typeof L !== "number" || L !== 5) {
        return;
    }

    ["hotdog"].forEach(async (group) => {
        const userModulePath = `../modules/security/users-${stage}.${group}.cjs`;

        if (!fs.existsSync(userModulePath)) {
            throw new Error(`Path does not exists: "${userModulePath}"`);
        }

        // eslint-disable-next-line security/detect-non-literal-require
        const users = require(userModulePath);

        for (const user of Object.values(users)) {
            await ensureUser(adminDB, user);
        }
    });
})();
