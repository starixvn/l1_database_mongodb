deploy: {
    const dbs = DBs(db);
    if (path.basename(path.resolve(`..`)) != `l${dbs._mongo?._identity?.L}`) break deploy;
    if (!["active", "mixed"].includes(dbs._mongo?._identity?.stage)) break deploy;

    const storageEngine = { wiredTiger: { configString: "block_compressor=zstd" } };
    [$Collection(dbs.minigame.ticket_silos, { storageEngine })].forEach((_) => {
        _.create();
        _.validate();
    });

    const {
        game_round_subRound_operator_player_U,
        game_player_time,
        time,
        roundTime,
        __archive_daily,
        __archive_do_daily,
        __archive_do_hourly,
        __archive_do_summary,
        __archive_hourly,
        __archive_summarized,
    } = require("../../modules/indexes/statement.cjs");

    const idxs = [
        game_round_subRound_operator_player_U,
        game_player_time,
        time,
        roundTime,
        __archive_daily,
        __archive_do_daily,
        __archive_do_hourly,
        __archive_do_summary,
        __archive_hourly,
        __archive_summarized,
    ].map(({ key, options }) => $Index(key, options));

    [$Indexes(dbs.minigame.ticket_silos, idxs)].forEach((_) => _.deploy());
}
