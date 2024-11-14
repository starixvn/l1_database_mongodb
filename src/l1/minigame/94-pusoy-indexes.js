(async () => {
    const { getIdentity } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { TTL_8d } = require("../../modules/indexes/archive-flags.cjs");
    const { id_U, time, round_bot_U, player } = require("../../modules/indexes/game.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await deployIndexes(gameDB, "pusoy_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "pusoy_bots", [TTL_8d, round_bot_U]);
    await deployIndexes(gameDB, "pusoy_surveys", [player]);
})();
