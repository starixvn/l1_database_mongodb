(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await Promise.allSettled(
        [
            "player_tracking", //
        ].map((collName) => ensureCollection(gameDB, collName, STORAGE_COMPRESSED)),
    );
    await deployIndexes(gameDB, "player_tracking", [
        { key: { visitorId: 1 }, options: { unique: true } },
        { key: { "players.playerId": 1, "players.operatorId": 1 }, options: {} },
    ]);
})();
