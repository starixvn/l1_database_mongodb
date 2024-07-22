const archiveConfigs = [];

/** Logs */
{
    const commonConfig = { category: "logs", type: 0 };

    [
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "log", name: "audit_events" },
            from: { db: "log", postfix: "" },
            to: { db: "log_arc", postfix: "_bk" },
            alias: { time: "StartDate" },
        },
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "log", name: "bets" },
            from: { db: "log", postfix: "" },
            to: { db: "log_arc", postfix: "_bk" },
            alias: { time: "requestTimeStamp" },
        },
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "log", name: "end_games" },
            from: { db: "log", postfix: "" },
            to: { db: "log_arc", postfix: "_bk" },
            alias: { time: "requestTimeStamp" },
        },
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "log", name: "failed_requests" },
            from: { db: "log", postfix: "" },
            to: { db: "log_arc", postfix: "_bk" },
            alias: { time: "requestTimeStamp" },
        },
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "log", name: "hit_jackpots" },
            from: { db: "log", postfix: "" },
            to: { db: "log_arc", postfix: "_bk" },
            alias: { time: "requestTimeStamp" },
        },
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "log", name: "membersignin_requests" },
            from: { db: "log", postfix: "" },
            to: { db: "log_arc", postfix: "_bk" },
            alias: { time: "requestTimeStamp" },
        },
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "log", name: "owsignin_requests" },
            from: { db: "log", postfix: "" },
            to: { db: "log_arc", postfix: "_bk" },
            alias: { time: "requestTimeStamp" },
        },
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "log", name: "retrieve_requests" },
            from: { db: "log", postfix: "" },
            to: { db: "log_arc", postfix: "_bk" },
            alias: { time: "requestTimeStamp" },
        },
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "log", name: "signin_requests" },
            from: { db: "log", postfix: "" },
            to: { db: "log_arc", postfix: "_bk" },
            alias: { time: "requestTimeStamp" },
        },
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "log", name: "ticket_detail_requests" },
            from: { db: "log", postfix: "" },
            to: { db: "log_arc", postfix: "_bk" },
            alias: { time: "requestTimeStamp" },
        },
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "log", name: "void_games" },
            from: { db: "log", postfix: "" },
            to: { db: "log_arc", postfix: "_bk" },
            alias: { time: "requestTimeStamp" },
        },
    ].forEach((config) => archiveConfigs.push(config));
}

/** Member */
{
    const commonConfig = { category: "member", type: 0 };

    [
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "member", name: "member_auths" },
            from: { db: "member", postfix: "" },
            to: { db: "member_arc", postfix: "_bk" },
            alias: { time: "time" },
        },
    ].forEach((config) => archiveConfigs.push(config));
}

/** Summaries */
{
    const commonConfig = { category: "summaries", type: 0 };

    [
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "sum", name: "round_summaries" },
            from: { db: "summary", postfix: "" },
            to: { db: "summary_arc", postfix: "_bk" },
            alias: { time: "time" },
            config: { cutOffsetHours: -24 * 3 },
        },
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "sum", name: "hourly_summaries" },
            from: { db: "summary", postfix: "" },
            to: { db: "summary_arc", postfix: "_bk" },
            alias: { time: "time" },
            config: { cutOffsetHours: -24 * 3 },
        },
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "sum", name: "daily_summaries" },
            from: { db: "summary", postfix: "" },
            to: { db: "summary_arc", postfix: "_bk" },
            alias: { time: "time" },
            config: { cutOffsetHours: -24 * 3 },
        },
    ].forEach((config) => archiveConfigs.push(config));
}

/** Users */
{
    const commonConfig = { category: "user", type: 0 };

    [
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "user", name: "usersessions" },
            from: { db: "minigame", postfix: "" },
            to: { db: "minigame_arc", postfix: "_bk" },
            alias: { time: "recheckInTime" },
        },
    ].forEach((config) => archiveConfigs.push(config));
}

/** Misc */
{
    const commonConfig = { category: "misc", type: 0 };

    [
        {
            ...commonConfig,
            id: 0,
            gameConfigs: { type: "misc", name: "notification_service_events" },
            from: { db: "minigame", postfix: "" },
            to: { db: "minigame_arc", postfix: "_bk" },
            alias: { time: "_id" },
            config: { updateOnly: true },
        },
    ].forEach((config) => archiveConfigs.push(config));
}

module.exports = { archiveConfigs };
