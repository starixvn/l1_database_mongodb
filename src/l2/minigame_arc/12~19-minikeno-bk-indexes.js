(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve(`..`)) !== `l${L}`) return;
    if (!["archive", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { time, round, id, player_round } = require("../../modules/indexes/game.cjs");

    const gameDBArc = db.getSiblingDB("minigame_arc");

    await Promise.allSettled(
        [
            "kenomax_phiens_bk", //
            "kenomax_cuocs_bk",
            "kenomax_ones_bk",
            "kenomax_results_bk",

            "kenomax2_phiens_bk",
            "kenomax2_cuocs_bk",
            "kenomax2_ones_bk",
            "kenomax2_results_bk",

            "kenomini_phiens_bk",
            "kenomini_cuocs_bk",
            "kenomini_ones_bk",
            "kenomini_results_bk",

            "kenomini2_phiens_bk",
            "kenomini2_cuocs_bk",
            "kenomini2_ones_bk",
            "kenomini2_results_bk",

            "kenoeast_phiens_bk",
            "kenoeast_cuocs_bk",
            "kenoeast_ones_bk",
            "kenoeast_results_bk",

            "kenowest_phiens_bk",
            "kenowest_cuocs_bk",
            "kenowest_ones_bk",
            "kenowest_results_bk",

            "kenosouth_phiens_bk",
            "kenosouth_cuocs_bk",
            "kenosouth_ones_bk",
            "kenosouth_results_bk",

            "kenonorth_phiens_bk",
            "kenonorth_cuocs_bk",
            "kenonorth_ones_bk",
            "kenonorth_results_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED))
    );

    await deployIndexes(gameDBArc, "kenomax_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "kenomax_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "kenomax_ones_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "kenomax_results_bk", [round]);

    await deployIndexes(gameDBArc, "kenomax2_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "kenomax2_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "kenomax2_ones_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "kenomax2_results_bk", [round]);

    await deployIndexes(gameDBArc, "kenomini_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "kenomini_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "kenomini_ones_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "kenomini_results_bk", [round]);

    await deployIndexes(gameDBArc, "kenomini2_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "kenomini2_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "kenomini2_ones_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "kenomini2_results_bk", [round]);

    await deployIndexes(gameDBArc, "kenoeast_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "kenoeast_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "kenoeast_ones_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "kenoeast_results_bk", [round]);

    await deployIndexes(gameDBArc, "kenowest_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "kenowest_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "kenowest_ones_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "kenowest_results_bk", [round]);

    await deployIndexes(gameDBArc, "kenosouth_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "kenosouth_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "kenosouth_ones_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "kenosouth_results_bk", [round]);

    await deployIndexes(gameDBArc, "kenonorth_phiens_bk", [id, time]);
    await deployIndexes(gameDBArc, "kenonorth_cuocs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "kenonorth_ones_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "kenonorth_results_bk", [round]);
})();
