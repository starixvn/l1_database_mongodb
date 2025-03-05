(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["archive", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { time, round, id, player_round } = require("../../modules/indexes/game.cjs");
    const { featureShoe } = require("../../modules/indexes/md5.cjs");

    const gameDBArc = db.getSiblingDB("minigame_arc");

    await Promise.allSettled(
        [
            "bac81_rounds_bk", //
            "bac81_betlogs_bk",
            "bac81_bets_bk",
            "bac81_results_bk",
            "bac81_multipliers_bk",
            "bac81_cut_card_pfs_bk",

            "bac82_rounds_bk",
            "bac82_betlogs_bk",
            "bac82_bets_bk",
            "bac82_results_bk",
            "bac82_multipliers_bk",
            "bac82_cut_card_pfs_bk",

            "bac83_rounds_bk",
            "bac83_betlogs_bk",
            "bac83_bets_bk",
            "bac83_results_bk",
            "bac83_multipliers_bk",
            "bac83_cut_card_pfs_bk",

            "bac84_rounds_bk",
            "bac84_betlogs_bk",
            "bac84_bets_bk",
            "bac84_results_bk",
            "bac84_multipliers_bk",
            "bac84_cut_card_pfs_bk",

            "bac85_rounds_bk",
            "bac85_betlogs_bk",
            "bac85_bets_bk",
            "bac85_results_bk",
            "bac85_multipliers_bk",
            "bac85_cut_card_pfs_bk",

            "bac86_rounds_bk",
            "bac86_betlogs_bk",
            "bac86_bets_bk",
            "bac86_results_bk",
            "bac86_multipliers_bk",
            "bac86_cut_card_pfs_bk",

            "bac87_rounds_bk",
            "bac87_betlogs_bk",
            "bac87_bets_bk",
            "bac87_results_bk",
            "bac87_multipliers_bk",
            "bac87_cut_card_pfs_bk",

            "bac88_rounds_bk",
            "bac88_betlogs_bk",
            "bac88_bets_bk",
            "bac88_results_bk",
            "bac88_multipliers_bk",
            "bac88_cut_card_pfs_bk",

            "bac89_rounds_bk",
            "bac89_betlogs_bk",
            "bac89_bets_bk",
            "bac89_results_bk",
            "bac89_multipliers_bk",
            "bac89_cut_card_pfs_bk",

            "bac90_rounds_bk",
            "bac90_betlogs_bk",
            "bac90_bets_bk",
            "bac90_results_bk",
            "bac90_multipliers_bk",
            "bac90_cut_card_pfs_bk",

            "bac91_rounds_bk",
            "bac91_betlogs_bk",
            "bac91_bets_bk",
            "bac91_results_bk",
            "bac91_multipliers_bk",
            "bac91_cut_card_pfs_bk",

            "bac92_rounds_bk",
            "bac92_betlogs_bk",
            "bac92_bets_bk",
            "bac92_results_bk",
            "bac92_multipliers_bk",
            "bac92_cut_card_pfs_bk",

            "bac97_rounds_bk",
            "bac97_betlogs_bk",
            "bac97_bets_bk",
            "bac97_results_bk",
            "bac97_multipliers_bk",
            "bac97_cut_card_pfs_bk",

            "bac98_rounds_bk",
            "bac98_betlogs_bk",
            "bac98_bets_bk",
            "bac98_results_bk",
            "bac98_multipliers_bk",
            "bac98_cut_card_pfs_bk",

            "bac100_rounds_bk",
            "bac100_betlogs_bk",
            "bac100_bets_bk",
            "bac100_results_bk",
            "bac100_multipliers_bk",
            "bac100_cut_card_pfs_bk",

            "bac101_rounds_bk",
            "bac101_betlogs_bk",
            "bac101_bets_bk",
            "bac101_results_bk",
            "bac101_multipliers_bk",
            "bac101_cut_card_pfs_bk",
        ].map((collName) => ensureCollection(gameDBArc, collName, STORAGE_COMPRESSED)),
    );

    await deployIndexes(gameDBArc, "bac81_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac81_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac81_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac81_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac81_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac81_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac82_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac82_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac82_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac82_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac82_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac82_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac83_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac83_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac83_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac83_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac83_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac83_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac84_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac84_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac84_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac84_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac84_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac84_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac85_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac85_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac85_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac85_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac85_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac85_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac86_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac86_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac86_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac86_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac86_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac86_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac87_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac87_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac87_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac87_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac87_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac87_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac88_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac88_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac88_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac88_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac88_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac88_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac89_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac89_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac89_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac89_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac89_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac89_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac90_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac90_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac90_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac90_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac90_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac90_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac91_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac91_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac91_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac91_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac91_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac91_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac92_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac92_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac92_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac92_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac92_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac92_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac97_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac97_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac97_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac97_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac97_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac97_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac98_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac98_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac98_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac98_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac98_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac98_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac100_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac100_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac100_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac100_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac100_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac100_cut_card_pfs_bk", [round]);

    await deployIndexes(gameDBArc, "bac101_rounds_bk", [id, time]);
    await deployIndexes(gameDBArc, "bac101_betlogs_bk", [round, player_round]);
    await deployIndexes(gameDBArc, "bac101_bets_bk", [round, time, player_round]);
    await deployIndexes(gameDBArc, "bac101_results_bk", [round, ...featureShoe]);
    await deployIndexes(gameDBArc, "bac101_multipliers_bk", [round]);
    await deployIndexes(gameDBArc, "bac101_cut_card_pfs_bk", [round]);
})();
