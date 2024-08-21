(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve(`..`)) !== `l${L}`) return;
    if (!["archive", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { time, round, id, player_round } = require("../../modules/indexes/game.cjs");

    const gameDBArc = db.getSiblingDB("minigame_arc");

    await Promise.allSettled(
        [
            "sicbo_phiens_bk", //
            "sicbo_cuocs_bk",
            "sicbo_ones_bk",
            "sicbo_results_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED))
    );

    await deployIndexes(gameDBArc, "sicbo_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "sicbo_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "sicbo_ones_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "sicbo_results_bk", [round]);
})();
