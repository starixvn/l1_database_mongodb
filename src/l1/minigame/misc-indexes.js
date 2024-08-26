(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { TTL_1h } = require("../../modules/indexes/archive-flags.cjs");
    const { createdAt } = require("../../modules/indexes/misc.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await Promise.allSettled(
        [
            "notification_service_events", //
        ].map((collName) => ensureCollection(gameDB, collName, STORAGE_COMPRESSED))
    );
    await deployIndexes(gameDB, "notification_service_events", [TTL_1h, createdAt]);
})();
