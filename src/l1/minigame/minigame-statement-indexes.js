deploy: {
    const dbs = DBs(db);
    const { L, stage } = dbs._mongo._identity;
    if (path.basename(path.resolve(`..`)) != `l${L}`) break deploy;
    if (!["active", "mixed"].includes(stage)) break deploy;

    const storageEngine = { wiredTiger: { configString: "block_compressor=zstd" } };
    [
        $Collection(dbs.minigame.ticket_silos, { storageEngine }), //
        $Collection(dbs.minigame.exchange_silos, { storageEngine }),
        $Collection(dbs.minigame.user_silos, { storageEngine }),
    ].forEach((_) => {
        _.create();
        _.validate();
    });

    const { game_round_subRound_operator_player_U, game_player_time, time, game_roundTime, time_code_U, player_operator } = require("../../modules/indexes/statement.cjs");
    const { __archive_daily, __archive_do_daily, __archive_do_hourly, __archive_do_summary, __archive_hourly, __archive_summarized } = require("../../modules/indexes/summary-flags.cjs");

    /** @param { IndexConfig[string] } arg */
    const toIdx = ({ key, options }) => $Index(key, options);
    const idxs = [
        game_round_subRound_operator_player_U,
        game_player_time,
        time,
        game_roundTime,
        __archive_daily,
        __archive_do_daily,
        __archive_do_hourly,
        __archive_do_summary,
        __archive_hourly,
        __archive_summarized,
    ].map(toIdx);

    [
        $Indexes(dbs.minigame.ticket_silos, idxs), //
        $Indexes(dbs.minigame.exchange_silos, [toIdx(time_code_U)]),
        $Indexes(dbs.minigame.user_silos, [toIdx(player_operator)]),
    ].forEach((_) => _.deploy());
}
