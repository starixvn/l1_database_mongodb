(async () => {
    const { getIdentity } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const {
        game_pool_FU,
        game_pool_created_FU,
        game_prize_FU,
        game_prize_created_FU,
        game_operator_sites_U,
        game_jackpotConfig_hitTime,
        game_jackpotConfig,
        game_jackpotConfig_U,
    } = require("../../modules/indexes/jackpots.cjs");
    const { __archive_do_summary, __archive_summarized } = require("../../modules/indexes/summary-flags.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await deployIndexes(gameDB, "jackpots", [game_pool_FU, game_pool_created_FU, game_prize_FU, game_prize_created_FU, __archive_summarized, __archive_do_summary]);
    await deployIndexes(gameDB, "jackpot_configs", [game_operator_sites_U]);
    await deployIndexes(gameDB, "bot_configs", [game_jackpotConfig_U]);
    await deployIndexes(gameDB, "jackpot_pools_notifications", [game_jackpotConfig]);
    await deployIndexes(gameDB, "jackpot_winners_notifications", [game_jackpotConfig_hitTime]);
})();
