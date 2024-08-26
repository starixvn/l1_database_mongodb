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
            "cointoss_rounds_bk", //
            "cointoss_betlogs_bk",
            "cointoss_bets_bk",
            "cointoss_results_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED))
    );

    await deployIndexes(gameDBArc, "cointoss_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "cointoss_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "cointoss_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "cointoss_results_bk", [round]);
})();
