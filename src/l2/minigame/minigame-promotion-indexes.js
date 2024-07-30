deploy: {
    const dbs = DBs(db);
    const { L, stage } = dbs._mongo._identity;
    if (path.basename(path.resolve(`..`)) != `l${L}`) break deploy;
    if (!["active", "mixed"].includes(stage)) break deploy;

    const storageEngine = { wiredTiger: { configString: "block_compressor=zstd" } };
    [
        $Collection(dbs.minigame.promotion_configs, { storageEngine }),
        $Collection(dbs.minigame.promotion_runs, { storageEngine }),
        $Collection(dbs.minigame.promotion_bets, { storageEngine }),
        $Collection(dbs.minigame.promotion_leaderboards, { storageEngine }),
    ].forEach((_) => {
        _.create();
        _.validate();
    });

    const toIdx = ({ key, options }) => $Index(key, options);
    const promoIdxs = require("../../modules/indexes/promotion.cjs");

    const { dataSourceTimeStamp, operator_player_game_round_U, promo_U, promo_operator_player_U } = {
        dataSourceTimeStamp: toIdx(promoIdxs.dataSourceTimeStamp),
        operator_player_game_round_U: toIdx(promoIdxs.operator_player_game_round_U),
        promo_U: toIdx(promoIdxs.promo_U),
        promo_operator_player_U: toIdx(promoIdxs.promo_operator_player_U),
    };

    [
        $Indexes(dbs.minigame.promotion_configs, [promo_U]),
        $Indexes(dbs.minigame.promotion_runs, [promo_U]),
        $Indexes(dbs.minigame.promotion_bets, [operator_player_game_round_U, dataSourceTimeStamp]),
        $Indexes(dbs.minigame.promotion_leaderboards, [promo_operator_player_U]),
    ].forEach((_) => _.deploy());
}
