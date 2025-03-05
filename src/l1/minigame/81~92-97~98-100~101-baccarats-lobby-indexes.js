(async () => {
    const { getIdentity } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { TTL_8d } = require("../../modules/indexes/archive-flags.cjs");
    const { id_U, time, time_archive, round__id, player_round_F, time_TTL_2m, uid_round_U, uid, firstRoundId, isAvailable_FU } = require("../../modules/indexes/game.cjs");
    const { __archive_do_summary, __archive_summarized } = require("../../modules/indexes/summary-flags.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await deployIndexes(gameDB, "bac81_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac81_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac81_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac81_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac81_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac81_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac81_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac82_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac82_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac82_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac82_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac82_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac82_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac82_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac83_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac83_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac83_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac83_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac83_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac83_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac83_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac84_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac84_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac84_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac84_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac84_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac84_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac84_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac85_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac85_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac85_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac85_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac85_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac85_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac85_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac86_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac86_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac86_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac86_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac86_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac86_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac86_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac87_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac87_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac87_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac87_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac87_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac87_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac87_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac88_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac88_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac88_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac88_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac88_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac88_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac88_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac89_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac89_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac89_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac89_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac89_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac89_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac89_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac90_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac90_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac90_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac90_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac90_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac90_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac90_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac91_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac91_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac91_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac91_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac91_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac91_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac91_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac92_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac92_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac92_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac92_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac92_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac92_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac92_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac97_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac97_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac97_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac97_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac97_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac97_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac97_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac98_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac98_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac98_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac98_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac98_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac98_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac98_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac100_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac100_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac100_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac100_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac100_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac100_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac100_cut_card_pfs", [TTL_8d, round__id]);

    await deployIndexes(gameDB, "bac101_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "bac101_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "bac101_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "bac101_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "bac101_results", [TTL_8d, time_archive, firstRoundId, isAvailable_FU]);
    await deployIndexes(gameDB, "bac101_multipliers", [TTL_8d, round__id]);
    await deployIndexes(gameDB, "bac101_cut_card_pfs", [TTL_8d, round__id]);
})();
