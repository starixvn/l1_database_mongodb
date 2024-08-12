deploy: {
    const dbs = DBs(db);
    const { L, stage } = dbs._mongo._identity;
    if (path.basename(path.resolve(`..`)) != `l${L}`) break deploy;
    if (!["active", "mixed"].includes(stage)) break deploy;

    [
        $Collection(dbs.minigame.users, {
            collation: { locale: "en", strength: 2 },
        }),
        $Collection(dbs.minigame.userinfos, {
            collation: { locale: "en", strength: 2 },
        }),
    ].forEach((_) => {
        _.create();
        _.validate();
    });

    /** @param {import("../../modules/type.cjs").IndexConfig[string]} arg */
    const toIdx = ({ key, options }) => $Index(key, options);
    const userIdxs = require("../../modules/indexes/user.cjs");
    const flagIdxs = require("../../modules/indexes/summary-flags.cjs");

    const {
        TTL,
        UID_U_en,
        currency_en,
        id_U,
        id_U_en,
        memberId,
        name_U_en,
        operatorId,
        playerId,
        recheckInTime,
        sessionId_U,
        ssoToken,
        type_inRoom,
        username_U_en,
        __archive_do_summary,
        __archive_summarized,
    } = {
        TTL: toIdx(userIdxs.TTL),
        UID_U_en: toIdx(userIdxs.UID_U_en),
        currency_en: toIdx(userIdxs.currency_en),
        id_U: toIdx(userIdxs.id_U),
        id_U_en: toIdx(userIdxs.id_U_en),
        memberId: toIdx(userIdxs.memberId),
        name_U_en: toIdx(userIdxs.name_U_en),
        operatorId: toIdx(userIdxs.operatorId),
        playerId: toIdx(userIdxs.playerId),
        recheckInTime: toIdx(userIdxs.recheckInTime),
        sessionId_U: toIdx(userIdxs.sessionId_U),
        ssoToken: toIdx(userIdxs.ssoToken),
        type_inRoom: toIdx(userIdxs.type_inRoom),
        username_U_en: toIdx(userIdxs.username_U_en),
        __archive_do_summary: toIdx(flagIdxs.__archive_do_summary),
        __archive_summarized: toIdx(flagIdxs.__archive_summarized),
    };

    [
        $Indexes(dbs.minigame.users, [memberId, operatorId, playerId, username_U_en]),
        $Indexes(dbs.minigame.userinfos, [currency_en, id_U, id_U_en, name_U_en, type_inRoom, UID_U_en]),
        $Indexes(dbs.minigame.usersessions, [playerId, recheckInTime, sessionId_U, ssoToken, TTL, __archive_summarized, __archive_do_summary]),
    ].forEach((_) => _.deploy());
}
