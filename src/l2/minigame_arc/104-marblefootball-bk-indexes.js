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
            "marblefootball_rounds_bk", //
            "marblefootball_betlogs_bk",
            "marblefootball_bets_bk",
            "marblefootball_results_bk",
            "marblefootball_tournaments_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED)),
    );

    await deployIndexes(gameDBArc, "marblefootball_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "marblefootball_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "marblefootball_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "marblefootball_results_bk", [round]);
})();
