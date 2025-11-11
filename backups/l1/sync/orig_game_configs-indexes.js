(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { _id, L, stage } = await getIdentity(db);
    if (/Main$/.test(_id)) return;
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { COLLATION_EN } = require("../../modules/const.cjs");
    const { name_U_en, name_U, gameId_U, partner_en, name_partner_U_en, gameId, group_game_U, value_U, name_partner_U } = require("../../modules/indexes/game-configs.cjs");

    const syncDB = db.getSiblingDB("sync");

    await Promise.allSettled(
        [
            "orig_currencies", //
            "orig_currency_groups",
        ].map((collName) => ensureCollection(syncDB, collName, COLLATION_EN)),
    );
    await deployIndexes(syncDB, "orig_game_configs", [name_U, name_U_en, gameId_U]);
    await deployIndexes(syncDB, "orig_currency_groups", [name_partner_U, name_partner_U_en, partner_en]);
    await deployIndexes(syncDB, "orig_currencies", [name_partner_U, name_partner_U_en]);
    await deployIndexes(syncDB, "orig_currency_group_games", [group_game_U, gameId]);
    await deployIndexes(syncDB, "orig_chips", [value_U]);
})();
