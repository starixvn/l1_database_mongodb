(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const {
        game_U,
        time_TTL_8d,
        time_currency_game_system_operator_U,
        game_system_time,
        game_currency_operator_site_round_U,
        flag_do_daily_F,
        flag_daily,
        flag_do_hourly_F,
        flag_hourly,
        time_currency_game_operator_site_U,
        time_game_operator_site_player_U,
        owGameTypeId_FU,
    } = require("../../modules/indexes/summary.cjs");
    const { TTL_8d } = require("../../modules/indexes/archive-flags.cjs");

    const sumDB = db.getSiblingDB("summary");

    await Promise.allSettled(
        [
            "betlog_summaries", //
            "round_summaries",
            "daily_summaries",
            "hourly_summaries",
            "daily_statements",
            "hourly_statements",
        ].map((collName) => ensureCollection(sumDB, collName, STORAGE_COMPRESSED))
    );

    await deployIndexes(sumDB, "game_summary_config", [game_U, owGameTypeId_FU]);

    await deployIndexes(sumDB, "betlog_summaries", [time_TTL_8d, time_currency_game_system_operator_U, game_system_time]);
    await deployIndexes(sumDB, "round_summaries", [TTL_8d, game_currency_operator_site_round_U, flag_do_daily_F, flag_daily, flag_do_hourly_F, flag_hourly]);
    await deployIndexes(sumDB, "daily_summaries", [TTL_8d, time_currency_game_operator_site_U]);
    await deployIndexes(sumDB, "hourly_summaries", [TTL_8d, time_currency_game_operator_site_U]);
    await deployIndexes(sumDB, "daily_statements", [TTL_8d, time_game_operator_site_player_U]);
    await deployIndexes(sumDB, "hourly_statements", [TTL_8d, time_game_operator_site_player_U]);
})();
