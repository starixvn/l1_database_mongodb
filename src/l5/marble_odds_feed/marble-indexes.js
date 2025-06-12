// @ts-check
(async () => {
    const { getIdentity } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { TTL_31d } = require("../../modules/indexes/archive-flags.cjs");
    const { game_round_U, game_event, event, game, timestamp } = require("../../modules/indexes/marble-odds-feed.cjs");

    const marbleDB = db.getSiblingDB("marble_odds_feed");

    await deployIndexes(marbleDB, "events", [TTL_31d, game_event]);
    await deployIndexes(marbleDB, "event_details", [TTL_31d, event]);
    await deployIndexes(marbleDB, "operators", []);
    await deployIndexes(marbleDB, "game_integrations", [game]);
    await deployIndexes(marbleDB, "market_integrations", []);
    await deployIndexes(marbleDB, "soccer_marble_rounds", [TTL_31d, game_round_U]);
    await deployIndexes(marbleDB, "log_records", [TTL_31d, timestamp]);
})();
