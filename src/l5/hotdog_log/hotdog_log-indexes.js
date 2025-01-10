(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { TTL_8d } = require("../../modules/indexes/archive-flags.cjs");
    const { StartDate, logTimeStamp, betlogs } = require("../../modules/indexes/log.cjs");

    const logDB = db.getSiblingDB("hotdog_log");

    await Promise.allSettled(
        [
            "audit_events", //
            "bets",
            "end_games",
            "failed_requests",
            "hit_jackpots",
            "retrieve_requests",
            "signin_requests",
            "ticket_detail_requests",
            "void_games",
        ].map((collName) => ensureCollection(logDB, collName, STORAGE_COMPRESSED)),
    );
    await deployIndexes(logDB, "audit_events", [TTL_8d, StartDate]);
    await deployIndexes(logDB, "bets", [TTL_8d, logTimeStamp, betlogs]);
    await deployIndexes(logDB, "end_games", [TTL_8d, logTimeStamp]);
    await deployIndexes(logDB, "failed_requests", [TTL_8d, logTimeStamp]);
    await deployIndexes(logDB, "hit_jackpots", [TTL_8d, logTimeStamp]);
    await deployIndexes(logDB, "retrieve_requests", [TTL_8d, logTimeStamp]);
    await deployIndexes(logDB, "signin_requests", [TTL_8d, logTimeStamp]);
    await deployIndexes(logDB, "ticket_detail_requests", [TTL_8d, logTimeStamp]);
    await deployIndexes(logDB, "void_games", [TTL_8d, logTimeStamp]);
})();
