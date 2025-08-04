(async () => {
    const { getIdentity } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { category_type_U, gameConfigs_id_U, name_id_U } = require("../../modules/indexes/ops.cjs");

    const opsDB = db.getSiblingDB("hotdog_ops_configs");

    await deployIndexes(opsDB, "index_templates", [category_type_U]);
    await deployIndexes(opsDB, "summary_templates", [category_type_U]);
    await deployIndexes(opsDB, "archive_templates", [category_type_U]);

    await deployIndexes(opsDB, "summary_configs", [gameConfigs_id_U, name_id_U]);
    await deployIndexes(opsDB, "archive_configs", [gameConfigs_id_U, name_id_U]);
})();
