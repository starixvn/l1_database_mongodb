(async () => {
    const { ensureCollection } = require("../modules/db.cjs");
    const adminDB = db.getSiblingDB("admin");
    await ensureCollection(adminDB, "identity", { capped: true, size: 256, max: 1 });
})();
