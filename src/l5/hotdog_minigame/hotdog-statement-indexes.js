// @ts-check
(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { TTL_6w } = require("../../modules/indexes/archive-flags.cjs");
    const { game_round_subRound_operator_player, game_player_time, time, time_code_U, player_operator } = require("../../modules/indexes/statement.cjs");
    const {
        __archive_daily,
        __archive_do_daily,
        __archive_do_hourly,
        __archive_do_summary,
        __archive_hourly,
        __archive_summarized,
        _ids_roundSummary,
        _ids_hourlyStatement,
        _ids_dailyStatement,
    } = require("../../modules/indexes/summary-flags.cjs");

    const gameDB = db.getSiblingDB("hotdog_minigame");

    await Promise.allSettled(
        [
            "ticket_silos", //
            "exchange_silos",
            "user_silos",
        ].map((collName) => ensureCollection(gameDB, collName, STORAGE_COMPRESSED)),
    );
    await deployIndexes(gameDB, "ticket_silos", [
        TTL_6w,
        game_round_subRound_operator_player,
        game_player_time,
        time,
        __archive_daily,
        __archive_do_daily,
        __archive_do_hourly,
        __archive_do_summary,
        __archive_hourly,
        __archive_summarized,
        _ids_roundSummary,
        _ids_hourlyStatement,
        _ids_dailyStatement,
    ]);
    await deployIndexes(gameDB, "exchange_silos", [time_code_U]);
    await deployIndexes(gameDB, "user_silos", [player_operator]);
})();
