(async () => {
    const { getIdentity } = require("../../modules/db.cjs");

    const { _id, L, stage } = await getIdentity(db);
    if (/Main$/.test(_id)) return;
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { uuid_collection } = require("../../modules/indexes/sync.cjs");

    const syncDB = db.getSiblingDB("sync");

    await deployIndexes(syncDB, "sync_result_logs", [uuid_collection]);
})();
