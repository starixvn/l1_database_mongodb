// @ts-check

/** @satisfies { IndexConfig } */
const indexes = /** @type {const} */ ({
    __archive_summarized: {
        key: { "__archive.summarized": 1 },
        options: {},
    },
    __archive_do_summary: {
        key: { "__archive.do_summary": 1 },
        options: { partialFilterExpression: { "__archive.do_summary": true } },
    },
    __archive_daily: {
        key: { "__archive.daily": 1 },
        options: {},
    },
    __archive_do_daily: {
        key: { "__archive.do_daily": 1 },
        options: { partialFilterExpression: { "__archive.do_daily": true } },
    },
    __archive_hourly: {
        key: { "__archive.hourly": 1 },
        options: {},
    },
    __archive_do_hourly: {
        key: { "__archive.do_hourly": 1 },
        options: { partialFilterExpression: { "__archive.do_hourly": true } },
    },
    _ids_roundSummary: {
        key: { "_ids.roundSummary": 1 },
        options: {},
    },
    _ids_hourlyStatement: {
        key: { "_ids.hourlyStatement": 1 },
        options: {},
    },
    _ids_dailyStatement: {
        key: { "_ids.dailyStatement": 1 },
        options: {},
    },
    _ids_hourlySummary: {
        key: { "_ids.hourlySummary": 1 },
        options: {},
    },
    _ids_dailySummary: {
        key: { "_ids.dailySummary": 1 },
        options: {},
    },
});

module.exports = indexes;
