(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { TTL_8d } = require("../../modules/indexes/archive-flags.cjs");
    const { memberId_iP, token } = require("../../modules/indexes/member.cjs");

    const memberDB = db.getSiblingDB("hotdog_member");

    await Promise.allSettled(
        [
            "member_auths", //
        ].map((collName) => ensureCollection(memberDB, collName, STORAGE_COMPRESSED)),
    );
    await deployIndexes(memberDB, "member_auths", [TTL_8d, memberId_iP, token]);
})();
