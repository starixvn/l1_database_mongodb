(async () => {
    const { getIdentity } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve(`..`)) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { TTL_8d } = require("../../modules/indexes/archive-flags.cjs");
    const { id_U, time, time_archive, round__id, player_round_F, uid_round_U, round, time_TTL_2m, uid__id } = require("../../modules/indexes/game.cjs");
    const { __archive_do_summary, __archive_summarized } = require("../../modules/indexes/summary-flags.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await deployIndexes(gameDB, "kenomax_phiens", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "kenomax_cuocs", [TTL_8d, time_archive, round__id, player_round_F, uid__id]);
    await deployIndexes(gameDB, "kenomax_ones", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "kenomax_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "kenomax_results", [TTL_8d, round]);

    await deployIndexes(gameDB, "kenomax2_phiens", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "kenomax2_cuocs", [TTL_8d, time_archive, round__id, player_round_F, uid__id]);
    await deployIndexes(gameDB, "kenomax2_ones", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "kenomax2_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "kenomax2_results", [TTL_8d, round]);

    await deployIndexes(gameDB, "kenomini_phiens", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "kenomini_cuocs", [TTL_8d, time_archive, round__id, player_round_F, uid__id]);
    await deployIndexes(gameDB, "kenomini_ones", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "kenomini_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "kenomini_results", [TTL_8d, round]);

    await deployIndexes(gameDB, "kenomini2_phiens", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "kenomini2_cuocs", [TTL_8d, time_archive, round__id, player_round_F, uid__id]);
    await deployIndexes(gameDB, "kenomini2_ones", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "kenomini2_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "kenomini2_results", [TTL_8d, round]);

    await deployIndexes(gameDB, "kenoeast_phiens", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "kenoeast_cuocs", [TTL_8d, time_archive, round__id, player_round_F, uid__id]);
    await deployIndexes(gameDB, "kenoeast_ones", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "kenoeast_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "kenoeast_results", [TTL_8d, round]);

    await deployIndexes(gameDB, "kenowest_phiens", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "kenowest_cuocs", [TTL_8d, time_archive, round__id, player_round_F, uid__id]);
    await deployIndexes(gameDB, "kenowest_ones", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "kenowest_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "kenowest_results", [TTL_8d, round]);

    await deployIndexes(gameDB, "kenosouth_phiens", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "kenosouth_cuocs", [TTL_8d, time_archive, round__id, player_round_F, uid__id]);
    await deployIndexes(gameDB, "kenosouth_ones", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "kenosouth_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "kenosouth_results", [TTL_8d, round]);

    await deployIndexes(gameDB, "kenonorth_phiens", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "kenonorth_cuocs", [TTL_8d, time_archive, round__id, player_round_F, uid__id]);
    await deployIndexes(gameDB, "kenonorth_ones", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "kenonorth_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "kenonorth_results", [TTL_8d, round]);
})();
