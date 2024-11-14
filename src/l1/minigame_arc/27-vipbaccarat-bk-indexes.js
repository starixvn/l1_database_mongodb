(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["archive", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { time, round, id, player_round } = require("../../modules/indexes/game.cjs");

    const gameDBArc = db.getSiblingDB("minigame_arc");

    await Promise.allSettled(
        [
            "vipbaccarat_phiens_bk", //
            "vipbaccarat_cuocs_bk",
            "vipbaccarat_results_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED)),
    );

    await deployIndexes(gameDBArc, "vipbaccarat_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "vipbaccarat_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "vipbaccarat_results_bk", [round]);
})();
