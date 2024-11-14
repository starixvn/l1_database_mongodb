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
            "unbalancedbigsmall1_rounds_bk", //
            "unbalancedbigsmall1_betlogs_bk",
            "unbalancedbigsmall1_bets_bk",
            "unbalancedbigsmall1_results_bk",

            "unbalancedbigsmall2_rounds_bk",
            "unbalancedbigsmall2_betlogs_bk",
            "unbalancedbigsmall2_bets_bk",
            "unbalancedbigsmall2_results_bk",

            "unbalancedbigsmall3_rounds_bk",
            "unbalancedbigsmall3_betlogs_bk",
            "unbalancedbigsmall3_bets_bk",
            "unbalancedbigsmall3_results_bk",

            "unbalancedbigsmall4_rounds_bk",
            "unbalancedbigsmall4_betlogs_bk",
            "unbalancedbigsmall4_bets_bk",
            "unbalancedbigsmall4_results_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED)),
    );

    await deployIndexes(gameDBArc, "unbalancedbigsmall1_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall1_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall1_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall1_results_bk", [round]);

    await deployIndexes(gameDBArc, "unbalancedbigsmall2_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall2_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall2_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall2_results_bk", [round]);

    await deployIndexes(gameDBArc, "unbalancedbigsmall3_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall3_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall3_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall3_results_bk", [round]);

    await deployIndexes(gameDBArc, "unbalancedbigsmall4_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall4_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall4_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall4_results_bk", [round]);
})();
