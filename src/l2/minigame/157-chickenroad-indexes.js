(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const gameDB = db.getSiblingDB("minigame");

    await Promise.allSettled(
        [
            "chickenroad_recentbets", //
        ].map((collName) => ensureCollection(gameDB, collName, { capped: true, size: 1024 ** 3, max: 10 })),
    );
})();
