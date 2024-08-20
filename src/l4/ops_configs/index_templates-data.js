(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve(`..`)) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const indexTemplates = [
        {
            category: "games",
            type: 6,
            colls: [
                {
                    ns: { db: "minigame", postfix: "_rounds" },
                    idxs: {
                        TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                        time: '{"key":{"time":1}}',
                        id_U: '{"key":{"id":1},"unique":true}',
                    },
                },
                {
                    ns: { db: "minigame", postfix: "_results" },
                    idxs: {
                        TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                        time: '{"key":{"time":1}}',
                        roundId: '{"key":{"roundId":1}}',
                        drawId_U: '{"key":{"drawId":1},"unique":true}',
                    },
                },
                {
                    ns: { db: "minigame", postfix: "_betlogs" },
                    idxs: {
                        TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                        time: '{"key":{"time":1}}',
                        roundId: '{"key":{"roundId":1,"_id":1}}',
                        drawId: '{"key":{"drawId":1,"_id":1}}',
                        player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"$or":[{"playerId":{"$gt":0}},{"playerId":{"$gt":""}}]}}',
                        uid: '{"key":{"uid":1}}',
                    },
                },
                {
                    ns: { db: "minigame", postfix: "_bets" },
                    idxs: {
                        TTL: '{"key":{"__archive.eventtime":1},"expireAfterSeconds":691200}',
                        time: '{"key":{"time":1}}',
                        roundId: '{"key":{"roundId":1,"_id":1}}',
                        drawId: '{"key":{"drawId":1,"_id":1}}',
                        player_roundId: '{"key":{"playerId":1,"roundId":1},"partialFilterExpression":{"$or":[{"playerId":{"$gt":0}},{"playerId":{"$gt":""}}]}}',
                        uid_drawId: '{"key":{"uid":1,"drawId":1},"unique":true}',
                        uid_roundId: '{"key":{"uid":1,"roundId":1}}',
                        uid_paid: '{"key":{"uid":1,"paid":1,"_id":1}}',
                        summarized: '{"key":{"__archive.summarized":1}}',
                        do_summary: '{"key":{"__archive.do_summary":1},"partialFilterExpression":{"__archive.do_summary":true}}',
                    },
                },
                {
                    ns: { db: "minigame", postfix: "_tmpbets" },
                    idxs: {
                        timeTTL: '{"key":{"time":1},"expireAfterSeconds":1200}',
                        roundId: '{"key":{"roundId":1,"_id":1}}',
                        drawId: '{"key":{"drawId":1,"_id":1}}',
                        uid_roundId: '{"key":{"uid":1,"roundId":1}}',
                    },
                },
            ],
        },
    ];

    /** @type { AnyBulkWriteOperation[] } */
    const bulkWrite = indexTemplates.map((doc) => {
        const { category, type } = doc;
        const data = Object.assign({}, { _id: { category, type } }, doc);

        return {
            replaceOne: {
                filter: { category, type },
                replacement: data,
                upsert: true,
            },
        };
    });

    const opsDB = db.getSiblingDB("ops_configs");
    {
        const res = await opsDB.getCollection("index_templates").bulkWrite(bulkWrite, { ordered: false });
        log("I", "DATA", `[${opsDB.getName()}.index_templates]`, `• ${stringifyResult(res)}`);
    }
})();
