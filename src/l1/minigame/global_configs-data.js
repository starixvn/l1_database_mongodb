(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve(`..`)) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { exchangeCodes, kenoMatchLiveOdds } = require("../../modules/minigame/minigame-global_configs.cjs");

    /** @type { AnyBulkWriteOperation[] } */
    const bulkWrite = [exchangeCodes(L), kenoMatchLiveOdds].map((doc) => {
        const { _id, type } = doc;
        const data = Object.assign({}, doc, { _id: ObjectId(_id) });

        return {
            replaceOne: {
                filter: { type },
                replacement: data,
                upsert: true,
            },
        };
    });

    const gameDB = db.getSiblingDB("minigame");
    {
        const res = await gameDB.getCollection("global_configs").bulkWrite(bulkWrite, { ordered: false });
        log("I", "DATA", `[${gameDB.getName()}.global_configs]`, `• ${stringifyResult(res)}`);
    }
})();
