// @ts-check
(async () => {
    const { getIdentity } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { TTL_8d } = require("../../modules/indexes/archive-flags.cjs");
    const {
        uid_round_freeBet_U,
        time_archive,
        round__id,
        uid_paid__id,
        player_round_F,
        id_U,
        time,
        time_TTL_2m,
        round,
        uid_round_U,
        uid__id,
    } = require("../../modules/indexes/game.cjs");
    const { __archive_do_summary, __archive_summarized } = require("../../modules/indexes/summary-flags.cjs");

    const gameDB = db.getSiblingDB("hotdog_minigame");

    await Promise.allSettled(
        [
            "xocxoc", // -
            "baccarat",
            "vipsedie",
            "vipfishprawncrab",
        ].map(async (name) => {
            await deployIndexes(gameDB, `${name}_phiens`, [TTL_8d, id_U, time]);
            await deployIndexes(gameDB, `${name}_cuocs`, [
                TTL_8d,
                uid_round_freeBet_U,
                time_archive,
                round__id,
                uid_paid__id,
                player_round_F,
                __archive_do_summary,
                __archive_summarized,
            ]);
            await deployIndexes(gameDB, `${name}_tmpcuocs`, [time_TTL_2m, round__id, uid_round_U]);
            await deployIndexes(gameDB, `${name}_results`, [TTL_8d, round]);
        }),
    );

    await Promise.allSettled(
        [
            "sicbo", // -
        ].map(async (name) => {
            await deployIndexes(gameDB, `${name}_phiens`, [TTL_8d, id_U, time]);
            await deployIndexes(gameDB, `${name}_cuocs`, [TTL_8d, time_archive, round__id, player_round_F, uid__id]);
            await deployIndexes(gameDB, `${name}_ones`, [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
            await deployIndexes(gameDB, `${name}_results`, [TTL_8d, round]);
        }),
    );

    await Promise.allSettled(
        [
            "dragontigerfight", // -
            "cointoss",
            "unbalancedbigsmall4",
            "footballcointoss",
        ].map(async (name) => {
            await deployIndexes(gameDB, `${name}_rounds`, [TTL_8d, id_U, time]);
            await deployIndexes(gameDB, `${name}_betlogs`, [TTL_8d, time_archive, round__id, player_round_F, uid__id]);
            await deployIndexes(gameDB, `${name}_bets`, [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
            await deployIndexes(gameDB, `${name}_tmpbets`, [time_TTL_2m, round__id, uid_round_U]);
            await deployIndexes(gameDB, `${name}_results`, [TTL_8d, round]);
        }),
    );
})();
