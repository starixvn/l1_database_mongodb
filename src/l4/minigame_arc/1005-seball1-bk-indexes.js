(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["archive", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { time, round, id, player_round, draw } = require("../../modules/indexes/game.cjs");

    const gameDBArc = db.getSiblingDB("minigame_arc");

    await Promise.allSettled(
        [
            "seball1_rounds_bk", //
            "seball1_betlogs_bk",
            "seball1_bets_bk",
            "seball1_results_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED)),
    );

    await deployIndexes(gameDBArc, "seball1_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "seball1_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "seball1_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "seball1_results_bk", [round, draw]);
})();
