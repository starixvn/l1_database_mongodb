(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["archive", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { betlogs } = require("../../modules/indexes/log.cjs");

    const logDBArc = db.getSiblingDB("log_arc");

    await Promise.allSettled(
        [
            "audit_events_bk", //
            "bets_bk",
            "end_games_bk",
            "failed_requests_bk",
            "hit_jackpots_bk",
            "retrieve_requests_bk",
            "signin_requests_bk",
            "ticket_detail_requests_bk",
            "void_games_bk",
        ].map((collName) => ensureCollection(logDBArc, collName, STORAGE_COMPRESSED)),
    );
    await deployIndexes(logDBArc, "bets_bk", [betlogs]);
})();
