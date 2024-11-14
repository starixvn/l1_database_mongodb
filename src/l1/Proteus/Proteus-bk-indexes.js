(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["archive", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { ts } = require("../../modules/indexes/proteus.cjs");

    const proteusDB = db.getSiblingDB("Proteus");

    await Promise.allSettled(
        [
            "betlogs_bk", //
        ].map((collName) => ensureCollection(proteusDB, collName, STORAGE_COMPRESSED)),
    );

    await deployIndexes(proteusDB, "betlogs_bk", [ts]);
})();
