(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { game_round_subRound_operator_player_U, game_player_time, time, game_roundTime, time_code_U, player_operator } = require("../../modules/indexes/statement.cjs");
    const { __archive_daily, __archive_do_daily, __archive_do_hourly, __archive_do_summary, __archive_hourly, __archive_summarized } = require("../../modules/indexes/summary-flags.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await Promise.allSettled(
        [
            "ticket_silos", //
            "exchange_silos",
            "user_silos",
        ].map((collName) => ensureCollection(gameDB, collName, STORAGE_COMPRESSED))
    );
    await deployIndexes(gameDB, "ticket_silos", [
        game_round_subRound_operator_player_U,
        game_player_time,
        time,
        game_roundTime,
        __archive_daily,
        __archive_do_daily,
        __archive_do_hourly,
        __archive_do_summary,
        __archive_hourly,
        __archive_summarized,
    ]);
    await deployIndexes(gameDB, "exchange_silos", [time_code_U]);
    await deployIndexes(gameDB, "user_silos", [player_operator]);
})();
