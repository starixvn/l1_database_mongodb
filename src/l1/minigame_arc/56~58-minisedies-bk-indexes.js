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
            "minisedie2_rounds_bk", //
            "minisedie2_bets_bk",
            "minisedie2_results_bk",

            "minisedie3_rounds_bk",
            "minisedie3_bets_bk",
            "minisedie3_results_bk",

            "minisedie4_rounds_bk",
            "minisedie4_bets_bk",
            "minisedie4_results_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED))
    );

    await deployIndexes(gameDBArc, "minisedie2_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "minisedie2_bets_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "minisedie2_results_bk", [round]);

    await deployIndexes(gameDBArc, "minisedie3_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "minisedie3_bets_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "minisedie3_results_bk", [round]);

    await deployIndexes(gameDBArc, "minisedie4_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "minisedie4_bets_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "minisedie4_results_bk", [round]);
})();
