(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["archive", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { time, round, id, player_round } = require("../../modules/indexes/game.cjs");
    const { featureMD5 } = require("../../modules/indexes/md5.cjs");

    const gameDBArc = db.getSiblingDB("minigame_arc");

    await Promise.allSettled(
        [
            "megakeno_rounds_bk", //
            "megakeno_bets_bk",
            "megakeno_ones_bk",
            "megakeno_results_bk",

            "megakeno2_phiens_bk",
            "megakeno2_cuocs_bk",
            "megakeno2_ones_bk",
            "megakeno2_results_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED)),
    );

    await deployIndexes(gameDBArc, "megakeno_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "megakeno_bets_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "megakeno_ones_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "megakeno_results_bk", [round, ...featureMD5]);

    await deployIndexes(gameDBArc, "megakeno2_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "megakeno2_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "megakeno2_ones_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "megakeno2_results_bk", [round, ...featureMD5]);
})();
