(async () => {
    const { getIdentity, ensureCollection } = require("../../modules/db.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { deployIndexes } = require("../../modules/index.cjs");
    const { STORAGE_COMPRESSED } = require("../../modules/const.cjs");
    const { memberId_iP } = require("../../modules/indexes/member.cjs");

    const memberDBArc = db.getSiblingDB("hotdog_member_arc");

    await Promise.allSettled(
        [
            "member_auths_bk", //
        ].map((collName) => ensureCollection(memberDBArc, collName, STORAGE_COMPRESSED)),
    );
    await deployIndexes(memberDBArc, "member_auths_bk", [memberId_iP]);
})();
