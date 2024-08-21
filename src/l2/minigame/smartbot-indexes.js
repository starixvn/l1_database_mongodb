(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve(`..`)) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { pat_time, time_group } = require("../../modules/indexes/smartbot.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await Promise.allSettled(
        [
            "smartbot_xocxoc_patterns", //
            "smartbot_xocxoc_bets",
            "smartbot_vipsedie_patterns",
            "smartbot_vipsedie_bets",
            "smartbot_taixiu_patterns",
            "smartbot_taixiu_bets",
            "smartbot_txturbo_patterns",
            "smartbot_txturbo_bets",
        ].map((collName) => ensureCollection(gameDB, collName, STORAGE_COMPRESSED))
    );
    await deployIndexes(gameDB, "smartbot_xocxoc_patterns", [time_group]);
    await deployIndexes(gameDB, "smartbot_xocxoc_bets", [pat_time]);
    await deployIndexes(gameDB, "smartbot_vipsedie_patterns", [time_group]);
    await deployIndexes(gameDB, "smartbot_vipsedie_bets", [pat_time]);
    await deployIndexes(gameDB, "smartbot_taixiu_patterns", [time_group]);
    await deployIndexes(gameDB, "smartbot_taixiu_bets", [pat_time]);
    await deployIndexes(gameDB, "smartbot_txturbo_patterns", [time_group]);
    await deployIndexes(gameDB, "smartbot_txturbo_bets", [pat_time]);
})();
