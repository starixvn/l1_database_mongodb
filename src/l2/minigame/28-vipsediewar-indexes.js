(async () => {
    const { getIdentity } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { TTL_8d } = require("../../modules/indexes/archive-flags.cjs");
    const { id_U, time, time_archive, round__id, player_round_F, uid_round_U, round, uid__id } = require("../../modules/indexes/game.cjs");
    const { __archive_do_summary, __archive_summarized } = require("../../modules/indexes/summary-flags.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await deployIndexes(gameDB, "vipsediewar_phiens", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "vipsediewar_cuocs", [TTL_8d, time_archive, round__id, player_round_F, uid__id]);
    await deployIndexes(gameDB, "vipsediewar_ones", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "vipsediewar_results", [TTL_8d, round]);
})();
