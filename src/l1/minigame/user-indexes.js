(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { COLLATION_EN } = require("../../modules/const.cjs");
    const { TTL_8d } = require("../../modules/indexes/archive-flags.cjs");
    const { __archive_summarized, __archive_do_summary } = require("../../modules/indexes/summary-flags.cjs");
    const {
        operatorId,
        playerId,
        username_U_en,
        currency_en,
        id_U,
        id_U_en,
        name_U_en,
        type_inRoom_en,
        UID_U_en,
        recheckInTime,
        sessionId_U,
        ssoToken,
        memberId_en,
    } = require("../../modules/indexes/user.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await Promise.allSettled(
        [
            "users", //
            "userinfos",
        ].map((collName) => ensureCollection(gameDB, collName, COLLATION_EN))
    );
    await deployIndexes(gameDB, "users", [memberId_en, operatorId, playerId, username_U_en]);
    await deployIndexes(gameDB, "userinfos", [currency_en, id_U, id_U_en, name_U_en, type_inRoom_en, UID_U_en]);
    await deployIndexes(gameDB, "usersessions", [TTL_8d, playerId, recheckInTime, sessionId_U, ssoToken, __archive_summarized, __archive_do_summary]);
})();
