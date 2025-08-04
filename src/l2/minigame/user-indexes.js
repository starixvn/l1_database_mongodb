// @ts-check
(async () => {
    const { getIdentity, ensureCollection, validateColl } = require("../../modules/db.cjs");

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
        UID_U_en,
        recheckInTime,
        sessionId_U,
        ssoToken,
        playerId_en,
        typeTrue_disabled_inRoom_en,
        typeTrue_red_en,
    } = require("../../modules/indexes/user.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await Promise.allSettled(
        [
            "users", //
            "userinfos",
        ].map((collName) => ensureCollection(gameDB, collName, COLLATION_EN)),
    );

    await validateColl(gameDB, "usersessions", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                title: "User Sessions Validation",
                required: ["_id", "userId"],
                properties: {
                    userId: { bsonType: "string", description: "should be ObjectId stringified", pattern: "^[a-f0-9]{24}$" },
                    currencyGroupId: { bsonType: "string", description: "should be ObjectId stringified", pattern: "^[a-f0-9]{24}$" },
                },
            },
        },
        validationLevel: "strict",
        validationAction: "error",
    });

    await deployIndexes(gameDB, "users", [playerId_en, operatorId, playerId, username_U_en]);
    await deployIndexes(gameDB, "userinfos", [currency_en, id_U, id_U_en, name_U_en, typeTrue_red_en, typeTrue_disabled_inRoom_en, UID_U_en]);
    await deployIndexes(gameDB, "usersessions", [TTL_8d, playerId, recheckInTime, sessionId_U, ssoToken, __archive_summarized, __archive_do_summary]);
})();
