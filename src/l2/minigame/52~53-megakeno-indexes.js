(async () => {
    const { getIdentity } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { TTL_8d } = require("../../modules/indexes/archive-flags.cjs");
    const { id_U, time, time_archive, round__id, player_round_F, uid_round_U, uid__id, time_TTL_2m, round } = require("../../modules/indexes/game.cjs");
    const { __archive_do_summary, __archive_summarized } = require("../../modules/indexes/summary-flags.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await deployIndexes(gameDB, "megakeno_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "megakeno_bets", [TTL_8d, time_archive, round__id, player_round_F, uid__id]);
    await deployIndexes(gameDB, "megakeno_ones", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "megakeno_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "megakeno_results", [TTL_8d, round]);

    await deployIndexes(gameDB, "megakeno2_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "megakeno2_bets", [TTL_8d, time_archive, round__id, player_round_F, uid__id]);
    await deployIndexes(gameDB, "megakeno2_ones", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "megakeno2_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "megakeno2_results", [TTL_8d, round]);
})();
