(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { exId_U, time } = require("../../modules/indexes/exchange.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await Promise.allSettled(
        [
            "exchange_rates", //
        ].map((collName) => ensureCollection(gameDB, collName, STORAGE_COMPRESSED)),
    );
    await deployIndexes(gameDB, "exchange_rates", [exId_U, time]);
})();
