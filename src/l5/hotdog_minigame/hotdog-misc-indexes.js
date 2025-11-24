// @ts-check
(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { TTL_1h, TTL_8d } = require("../../modules/indexes/archive-flags.cjs");
    const { createdAt, displayGame, finish_isPartner, batchId } = require("../../modules/indexes/misc.cjs");

    const gameDB = db.getSiblingDB("hotdog_minigame");

    await Promise.allSettled(
        [
            "notification_service_events", //
        ].map((collName) => ensureCollection(gameDB, collName, STORAGE_COMPRESSED)),
    );
    await deployIndexes(gameDB, "notification_service_events", [TTL_1h, createdAt]);
    await deployIndexes(gameDB, "notifications", [displayGame]);
    await deployIndexes(gameDB, "um_info", [finish_isPartner]);
    await deployIndexes(gameDB, "ticket_importer_last_processed", [TTL_8d, batchId]);
    await deployIndexes(gameDB, "import_requests", [TTL_8d]);
})();
