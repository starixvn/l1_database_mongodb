(async () => {
    const { getIdentity } = require("../../../src/modules/db.cjs");

    const { _id, L, stage } = await getIdentity(db);
    if (/Main$/.test(_id)) return;
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../../src/modules/index.cjs");
    const { uuid_collection } = require("../../../src/modules/indexes/sync.cjs");

    const syncDB = db.getSiblingDB("sync");

    await deployIndexes(syncDB, "sync_result_logs", [uuid_collection]);
})();
