// @ts-check
(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const {
        promo_U,
        operator_player_game_round_U,
        dataSourceTimeStamp,
        promo_operator_player_U,
        game_status,
        operator_player_promoCode_FU,
        code_U,
    } = require("../../modules/indexes/promotion.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await Promise.allSettled(
        [
            "promotions", //
            "promotion_configs",
            "promotion_runs",
            "promotion_bets",
            "promotion_leaderboards",
        ].map((collName) => ensureCollection(gameDB, collName, STORAGE_COMPRESSED)),
    );
    await deployIndexes(gameDB, "promotions", [game_status]);
    await deployIndexes(gameDB, "promotion_configs", [promo_U]);
    await deployIndexes(gameDB, "promotion_runs", [promo_U]);
    await deployIndexes(gameDB, "promotion_bets", [operator_player_game_round_U, dataSourceTimeStamp]);
    await deployIndexes(gameDB, "promotion_leaderboards", [promo_operator_player_U]);

    await deployIndexes(gameDB, "game_promotions", [code_U]);
    await deployIndexes(gameDB, "game_player_promotions", [operator_player_promoCode_FU]);
})();
