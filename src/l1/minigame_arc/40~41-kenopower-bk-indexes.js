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
            "kenopower1_phiens_bk", //
            "kenopower1_cuocs_bk",
            "kenopower1_ones_bk",

            "kenopower2_phiens_bk",
            "kenopower2_cuocs_bk",
            "kenopower2_ones_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED)),
    );

    await deployIndexes(gameDBArc, "kenopower1_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "kenopower1_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "kenopower1_ones_bk", [round, time, player_round]);

    await deployIndexes(gameDBArc, "kenopower2_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "kenopower2_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "kenopower2_ones_bk", [round, time, player_round]);
})();
