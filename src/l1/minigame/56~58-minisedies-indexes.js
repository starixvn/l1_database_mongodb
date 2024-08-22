(async () => {
    const { getIdentity } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { TTL_8d } = require("../../modules/indexes/archive-flags.cjs");
    const { id_U, time, time_archive, round__id, player_round_F, uid_paid__id, uid_round_U, round, uid_round_freeBet_U, time_TTL_2m } = require("../../modules/indexes/game.cjs");
    const { __archive_do_summary, __archive_summarized } = require("../../modules/indexes/summary-flags.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await deployIndexes(gameDB, "minisedie2_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "minisedie2_bets", [TTL_8d, uid_round_freeBet_U, time_archive, round__id, uid_paid__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "minisedie2_results", [TTL_8d, round]);

    await deployIndexes(gameDB, "minisedie3_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "minisedie3_bets", [TTL_8d, uid_round_freeBet_U, time_archive, round__id, uid_paid__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "minisedie3_results", [TTL_8d, round]);

    await deployIndexes(gameDB, "minisedie4_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "minisedie4_bets", [TTL_8d, uid_round_freeBet_U, time_archive, round__id, uid_paid__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "minisedie4_results", [TTL_8d, round]);
})();
