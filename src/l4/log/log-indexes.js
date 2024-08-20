(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve(`..`)) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { TTL } = require("../../modules/indexes/archive-flags.cjs");
    const { StartDate, logTimeStamp, betlogs } = require("../../modules/indexes/log.cjs");

    const logDB = db.getSiblingDB("log");

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
        ].map((collName) => ensureCollection(logDB, collName, STORAGE_COMPRESSED))
    );
    await deployIndexes(logDB, "audit_events", [TTL, StartDate]);
    await deployIndexes(logDB, "bets", [TTL, logTimeStamp, betlogs]);
    await deployIndexes(logDB, "end_games", [TTL, logTimeStamp]);
    await deployIndexes(logDB, "failed_requests", [TTL, logTimeStamp]);
    await deployIndexes(logDB, "hit_jackpots", [TTL, logTimeStamp]);
    await deployIndexes(logDB, "retrieve_requests", [TTL, logTimeStamp]);
    await deployIndexes(logDB, "signin_requests", [TTL, logTimeStamp]);
    await deployIndexes(logDB, "ticket_detail_requests", [TTL, logTimeStamp]);
    await deployIndexes(logDB, "void_games", [TTL, logTimeStamp]);
})();
