(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["archive", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { time, round, id, player_round, firstRoundId } = require("../../modules/indexes/game.cjs");

    const gameDBArc = db.getSiblingDB("minigame_arc");

    await Promise.allSettled(
        [
            "blockchainbaccarat_rounds_bk", //
            "blockchainbaccarat_bets_bk",
            "blockchainbaccarat_results_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED)),
    );

    await deployIndexes(gameDBArc, "blockchainbaccarat_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "blockchainbaccarat_bets_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "blockchainbaccarat_results_bk", [firstRoundId]);
})();
