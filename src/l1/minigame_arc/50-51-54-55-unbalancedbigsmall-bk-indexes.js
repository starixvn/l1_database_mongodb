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
            "unbalancedbigsmall1_rounds", //
            "unbalancedbigsmall1_betlogs",
            "unbalancedbigsmall1_bets",
            "unbalancedbigsmall1_results",

            "unbalancedbigsmall2_rounds",
            "unbalancedbigsmall2_betlogs",
            "unbalancedbigsmall2_bets",
            "unbalancedbigsmall2_results",

            "unbalancedbigsmall3_rounds",
            "unbalancedbigsmall3_betlogs",
            "unbalancedbigsmall3_bets",
            "unbalancedbigsmall3_results",

            "unbalancedbigsmall4_rounds",
            "unbalancedbigsmall4_betlogs",
            "unbalancedbigsmall4_bets",
            "unbalancedbigsmall4_results",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED))
    );

    await deployIndexes(gameDBArc, "unbalancedbigsmall1_rounds", [id, time]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall1_betlogs", [round, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall1_bets", [round, time, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall1_results", [round]);

    await deployIndexes(gameDBArc, "unbalancedbigsmall2_rounds", [id, time]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall2_betlogs", [round, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall2_bets", [round, time, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall2_results", [round]);

    await deployIndexes(gameDBArc, "unbalancedbigsmall3_rounds", [id, time]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall3_betlogs", [round, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall3_bets", [round, time, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall3_results", [round]);

    await deployIndexes(gameDBArc, "unbalancedbigsmall4_rounds", [id, time]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall4_betlogs", [round, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall4_bets", [round, time, player_round]);
    await deployIndexes(gameDBArc, "unbalancedbigsmall4_results", [round]);
})();
