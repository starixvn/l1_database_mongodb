// @ts-check
(async () => {
    const { getIdentity, ensureCollection, validateColl } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { COLLATION_EN } = require("../../modules/const.cjs");
    const {
        name_U_en,
        name_U,
        gameId_U,
        type_U,
        partner_en,
        partner_U_en,
        name_partner_U_en,
        gameId,
        group_game_U,
        value_U,
        name_partner_U,
    } = require("../../modules/indexes/game-configs.cjs");

    const gameDB = db.getSiblingDB("hotdog_minigame");

    await Promise.allSettled(
        [
            "currencies", //
            "currency_groups",
            "partners",
        ].map((collName) => ensureCollection(gameDB, collName, COLLATION_EN)),
    );

    await validateColl(gameDB, "game_configs", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                title: "Game Configs Validation",
                required: ["_id", "gameId", "name"],
                properties: {
                    gameId: { bsonType: "int" },
                    name: { bsonType: "string", description: "name cannot contains special characters", pattern: "^[a-zA-Z0-9]+$" },
                    type: { bsonType: "int" },
                },
            },
        },
        validationLevel: "strict",
        validationAction: "error",
    });

    await deployIndexes(gameDB, "archive_statuses", [name_U, name_U_en]);
    await deployIndexes(gameDB, "game_configs", [name_U, name_U_en, gameId_U]);
    await deployIndexes(gameDB, "global_configs", [type_U]);
    await deployIndexes(gameDB, "partners", [partner_U_en]);
    await deployIndexes(gameDB, "currency_groups", [name_partner_U, name_partner_U_en, partner_en]);
    await deployIndexes(gameDB, "currencies", [name_partner_U, name_partner_U_en]);
    await deployIndexes(gameDB, "currency_group_games", [group_game_U, gameId]);
    await deployIndexes(gameDB, "chips", [value_U]);
})();
