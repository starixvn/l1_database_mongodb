(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve(`..`)) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED, COLLATION_EN } = require("../../modules/const.cjs");
    const { username_U_en } = require("../../modules/indexes/admin.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await Promise.allSettled(
        [
            "admins", //
            "admin_users",
        ].map((collName) => ensureCollection(gameDB, collName, { ...STORAGE_COMPRESSED, ...COLLATION_EN }))
    );
    await deployIndexes(gameDB, "admins", [username_U_en]);
    await deployIndexes(gameDB, "admin_users", [username_U_en]);
})();
