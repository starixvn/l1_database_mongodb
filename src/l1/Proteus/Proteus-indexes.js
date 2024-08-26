(async () => {
    const { getIdentity } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { ts_TTL_8d } = require("../../modules/indexes/proteus.cjs");

    const proteusDB = db.getSiblingDB("Proteus");

    await deployIndexes(proteusDB, "betlogs", [ts_TTL_8d]);
})();
