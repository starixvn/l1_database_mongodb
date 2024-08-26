(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["archive", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const {
        time_currency_game_system_operator,
        game_currency_operator_site_round,
        time_currency_game_operator_site,
        time_game_operator_site_player,
    } = require("../../modules/indexes/summary.cjs");
    const { TTL_8d } = require("../../modules/indexes/archive-flags.cjs");

    const sumDBArc = db.getSiblingDB("summary_arc");

    await Promise.allSettled(
        [
            "betlog_summaries", //
            "round_summaries",
            "daily_summaries",
            "hourly_summaries",
            "daily_statements",
            "hourly_statements",
        ].map((collName) => ensureCollection(sumDBArc, collName, STORAGE_COMPRESSED))
    );

    await deployIndexes(sumDBArc, "betlog_summaries", [time_currency_game_system_operator]);
    await deployIndexes(sumDBArc, "round_summaries", [game_currency_operator_site_round]);
    await deployIndexes(sumDBArc, "daily_summaries", [time_currency_game_operator_site]);
    await deployIndexes(sumDBArc, "hourly_summaries", [time_currency_game_operator_site]);
    await deployIndexes(sumDBArc, "daily_statements", [time_game_operator_site_player]);
    await deployIndexes(sumDBArc, "hourly_statements", [time_game_operator_site_player]);
})();
