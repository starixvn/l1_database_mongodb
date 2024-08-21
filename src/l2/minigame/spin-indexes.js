(async () => {
    const { getIdentity, validateColl } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve(`..`)) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { player_U, player, id_U, time_player, round_member, round_member_FU, member_time } = require("../../modules/indexes/spin.cjs");

    const gameDB = db.getSiblingDB("minigame");

    await validateColl(gameDB, "spin_logs", {
        validator: {
            $jsonSchema: {
                bsonType: `object`,
                required: [`time`, `memberId`, `spinCnt`, `source`],
                properties: {
                    roundId: { bsonType: `double` },
                    key: { bsonType: `string` },
                    spinCnt: { bsonType: `double` },
                },
            },
        },
        validationLevel: "strict",
        validationAction: "error",
    });

    await deployIndexes(gameDB, "spins", [player_U]);
    await deployIndexes(gameDB, "spin_results", [id_U, player, time_player]);
    await deployIndexes(gameDB, "spin_logs", [round_member, round_member_FU, member_time]);
})();
