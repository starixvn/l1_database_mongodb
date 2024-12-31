(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["archive", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { time, round, id, player_round } = require("../../modules/indexes/game.cjs");
    const { featureProvablyFair } = require("../../modules/indexes/md5.cjs");

    const gameDBArc = db.getSiblingDB("minigame_arc");

    await Promise.allSettled(
        [
            "cointap_rounds_bk", //
            "cointap_betlogs_bk",
            "cointap_bets_bk",
            "cointap_results_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED)),
    );

    await deployIndexes(gameDBArc, "cointap_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "cointap_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "cointap_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "cointap_results_bk", [round, ...featureProvablyFair]);
})();
