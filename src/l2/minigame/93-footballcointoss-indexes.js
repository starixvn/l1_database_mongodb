(async () => {
    const { getIdentity } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { log, stringifyResult } = require("../../modules/utils.cjs");
    const { deployIndexes } = require("../../modules/index.cjs");
    const { TTL_8d } = require("../../modules/indexes/archive-flags.cjs");
    const { id_U, time, time_archive, round__id, player_round_F, time_TTL_2m, uid_round_U, uid, round, startTime } = require("../../modules/indexes/game.cjs");
    const { __archive_do_summary, __archive_summarized } = require("../../modules/indexes/summary-flags.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await deployIndexes(gameDB, "footballcointoss_matches", [startTime]);
    await deployIndexes(gameDB, "footballcointoss_rounds", [TTL_8d, id_U, time]);
    await deployIndexes(gameDB, "footballcointoss_betlogs", [TTL_8d, time_archive, round__id, player_round_F, uid]);
    await deployIndexes(gameDB, "footballcointoss_bets", [TTL_8d, uid_round_U, time_archive, round__id, player_round_F, __archive_do_summary, __archive_summarized]);
    await deployIndexes(gameDB, "footballcointoss_tmpbets", [time_TTL_2m, round__id, uid_round_U]);
    await deployIndexes(gameDB, "footballcointoss_results", [TTL_8d, round]);

    const { updateMatches } = require("../../modules/minigame/footballcointoss-data.cjs");
    {
        const res = await gameDB.getCollection("footballcointoss_matches").bulkWrite(updateMatches, { ordered: false });
        log("I", "DATA", `[${gameDB.getName()}.footballcointoss_matches]`, `• ${stringifyResult(res)}`);
    }
})();
