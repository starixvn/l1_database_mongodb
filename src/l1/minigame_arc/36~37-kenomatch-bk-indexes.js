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
            "kenomatch1_phiens_bk", //
            "kenomatch1_cuocs_bk",
            "kenomatch1_ones_bk",

            "kenomatch2_phiens_bk",
            "kenomatch2_cuocs_bk",
            "kenomatch2_ones_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED)),
    );

    await deployIndexes(gameDBArc, "kenomatch1_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "kenomatch1_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "kenomatch1_ones_bk", [round, time, player_round]);

    await deployIndexes(gameDBArc, "kenomatch2_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "kenomatch2_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "kenomatch2_ones_bk", [round, time, player_round]);
})();
