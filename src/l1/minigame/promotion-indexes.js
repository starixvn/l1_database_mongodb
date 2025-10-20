// @ts-check
(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { game_status, code_U, operator_player_promoCode_FU } = require("../../modules/indexes/promotion.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await Promise.allSettled(
        [
            "promotions", //
        ].map((collName) => ensureCollection(gameDB, collName, STORAGE_COMPRESSED)),
    );
    await deployIndexes(gameDB, "promotions", [game_status]);

    await deployIndexes(gameDB, "game_promotions", [code_U]);
    await deployIndexes(gameDB, "game_player_promotions", [operator_player_promoCode_FU]);
})();
