deploy: {
    const dbs = DBs(db);
    const { L, stage } = dbs._mongo._identity;
    if (path.basename(path.resolve(`..`)) != `l${L}`) break deploy;
    if (!["active", "mixed"].includes(stage)) break deploy;

    const toIdx = ({ key, options }) => $Index(key, options);
    const { __archive_do_summary, __archive_summarized } = require("../../modules/indexes/statement.cjs");

    const { game_pool_FU, game_pool_created_FU, game_prize_FU, game_prize_created_FU } = {
        game_pool_created_FU: $Index(
            { gameId: 1, pool: 1, createdAt: 1 },
            {
                unique: true,
                partialFilterExpression: { pool: { $gt: 0 } },
            }
        ),
        game_pool_FU: $Index(
            { gameId: 1, pool: 1 },
            {
                unique: true,
                partialFilterExpression: { hitAt: null, pool: { $gt: 0 } },
            }
        ),
        game_prize_created_FU: $Index(
            { gameId: 1, prize: 1, createdAt: 1 },
            {
                unique: true,
                partialFilterExpression: { gameId: { $in: [76] }, prize: { $gt: "" } },
            }
        ),
        game_prize_FU: $Index(
            { gameId: 1, prize: 1 },
            {
                unique: true,
                partialFilterExpression: { prize: { $gt: "" } },
            }
        ),
    };
    const idxs = [$Indexes(dbs.minigame.jackpots, [game_pool_FU, game_pool_created_FU, game_prize_FU, game_prize_created_FU, toIdx(__archive_summarized), toIdx(__archive_do_summary)])];
    idxs.forEach((_) => _.deploy());
}
