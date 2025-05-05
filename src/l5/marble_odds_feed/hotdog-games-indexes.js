(async () => {
    const { getIdentity } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { game_round_U, game_event, event, game, timestamp } = require("../../modules/indexes/marble-odds-feed.cjs");

    const marbleDB = db.getSiblingDB("marble_odds_feed");

    await deployIndexes(marbleDB, "events", [game_event]);
    await deployIndexes(marbleDB, "event_details", [event]);
    await deployIndexes(marbleDB, "operators", []);
    await deployIndexes(marbleDB, "game_integrations", [game]);
    await deployIndexes(marbleDB, "market_integrations", []);
    await deployIndexes(marbleDB, "soccer_marble_rounds", [game_round_U]);
    await deployIndexes(marbleDB, "log_records", [timestamp]);
})();
