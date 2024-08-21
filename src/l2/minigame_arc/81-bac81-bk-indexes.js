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
            "bac81_rounds_bk", //
            "bac81_betlogs_bk",
            "bac81_bets_bk",
            "bac81_results_bk",
            "bac81_multipliers_bk",
            "bac81_cut_card_pfs_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED))
    );

    await deployIndexes(gameDBArc, "bac81_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac81_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac81_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac81_results_bk", [round]);
    await deployIndexes(gameDBArc, "bac81_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac81_cut_card_pfs_bk", [round]);
})();
