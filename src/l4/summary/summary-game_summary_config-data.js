(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve(`..`)) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const gameSummaryConfig = [
        {
            gameId: 1001,
            owGameTypeId: 10801,
            name: { en: "Bac Ball 1", vi: "Bac Ball 1", grp: "Bac Ball", game: "Bac Ball" },
            coll: { db: "minigame", group: "bacball1", round: "_rounds", postfix: "_bets" },
        },
        {
            gameId: 1002,
            owGameTypeId: 10802,
            name: { en: "Bac Ball 2", vi: "Bac Ball 2", grp: "Bac Ball", game: "Bac Ball" },
            coll: { db: "minigame", group: "bacball2", round: "_rounds", postfix: "_bets" },
        },
        {
            gameId: 1003,
            owGameTypeId: 10803,
            name: { en: "Lucky Next 1", vi: "Lucky Next 1", grp: "Lucky Next", game: "Lucky RNG" },
            coll: { db: "minigame", group: "luckynext1", round: "_rounds", postfix: "_bets" },
        },
        {
            gameId: 1004,
            owGameTypeId: 10804,
            name: { en: "Lucky Next 2", vi: "Lucky Next 2", grp: "Lucky Next", game: "Lucky RNG" },
            coll: { db: "minigame", group: "luckynext2", round: "_rounds", postfix: "_bets" },
        },
        {
            gameId: 1005,
            owGameTypeId: 10805,
            name: { en: "Se Ball", vi: "Se Ball", grp: "Se Ball", game: "Se Ball" },
            coll: { db: "minigame", group: "seball1", round: "_rounds", postfix: "_bets" },
        },
        {
            gameId: 1006,
            owGameTypeId: 10806,
            name: { en: "Lucky Three", vi: "Lucky Three", grp: "Lucky Three", game: "Lucky RNG" },
            coll: { db: "minigame", group: "luckythree", round: "_rounds", postfix: "_bets" },
        },
        {
            gameId: 1007,
            owGameTypeId: 10807,
            name: { en: "Sic Ball", vi: "Sic Ball", grp: "Sic Ball", game: "Sic Ball" },
            coll: { db: "minigame", group: "sicball", round: "_rounds", postfix: "_bets" },
        },
    ];

    /** @type { AnyBulkWriteOperation[] } */
    const bulkWrite = gameSummaryConfig.map((doc) => {
        const { gameId } = doc;
        const data = Object.assign({}, { _id: { gameId } }, doc);

        return {
            replaceOne: {
                filter: { gameId },
                replacement: data,
                upsert: true,
            },
        };
    });

    bulkWrite.push({
        deleteMany: {
            filter: {
                gameId: { $nin: gameSummaryConfig.map(({ gameId }) => gameId) },
            },
        },
    });

    const sumDB = db.getSiblingDB("summary");
    {
        const res = await sumDB.getCollection("game_summary_config").bulkWrite(bulkWrite, { ordered: false });
        log("I", "DATA", `[${sumDB.getName()}.game_summary_config]`, `• ${stringifyResult(res)}`);
    }
})();
