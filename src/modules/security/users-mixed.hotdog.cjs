const {
    clusterMonitor,
    config$dbOwner,
    dbOwner,
    ldb$$monitorSystem,
    ldb$$public,
    ldb$$readSystem,
    local$dbOwner,
    prefix_log$read,
    prefix_log$readWrite,
    prefix_log_arc$readWrite,
    prefix_member$read,
    prefix_member$readWrite,
    prefix_member_arc$readWrite,
    prefix_minigame$read,
    prefix_minigame$readWrite,
    prefix_minigame_arc$readWrite,
    prefix_minigame_rm$read,
    prefix_minigame_rm$readWrite,
    ops_configs$read,
    root,
    prefix_summary$read,
    prefix_summary$readWrite,
    prefix_summary_arc$readWrite,
    readAnyDatabase,
    readWriteAnyDatabase,
    prefix_log_arc$read,
    prefix_member_arc$read,
    prefix_minigame_arc$read,
    prefix_summary_arc$read,
} = require("./roles.cjs");

const prefix = /** @type {const} */ ("hotdog");

/** @satisfies { Record<string, UserDefinition> } */
const mixedUsers = {
    billy$admin: {
        db: "admin",
        user: "billy.bui",
        roles: [
            root, //
            dbOwner,
            config$dbOwner,
            local$dbOwner,
        ],
    },
    prefix_archive: {
        db: "admin",
        user: `${prefix}_archive`,
        roles: [
            ldb$$public, //
            prefix_log$readWrite(prefix),
            prefix_member$readWrite(prefix),
            prefix_minigame$readWrite(prefix),
            ops_configs$read,
            prefix_summary$readWrite(prefix),
            prefix_log_arc$readWrite(prefix),
            prefix_member_arc$readWrite(prefix),
            prefix_minigame_arc$readWrite(prefix),
            prefix_minigame_rm$readWrite(prefix),
            prefix_summary_arc$readWrite(prefix),
        ],
    },
    prefix_backend: {
        db: "admin",
        user: `${prefix}_backend`,
        roles: [
            ldb$$public, //
            prefix_log$readWrite(prefix),
            prefix_log_arc$read(prefix),
            prefix_member$readWrite(prefix),
            prefix_member_arc$read(prefix),
            prefix_minigame$readWrite(prefix),
            prefix_minigame_arc$read(prefix),
            prefix_minigame_rm$readWrite(prefix),
            prefix_summary$read(prefix),
            prefix_summary_arc$read(prefix),
        ],
    },
    lmn_backup: {
        db: "admin",
        user: "lmn_backup",
        roles: [
            ldb$$readSystem, //
        ],
    },
    lmn_readonly: {
        db: "admin",
        user: "lmn_readonly",
        roles: [
            ldb$$public, //
            readAnyDatabase,
        ],
    },
    lmn_summary: {
        db: "admin",
        user: "lmn_summary",
        roles: [
            ldb$$public, //
            readWriteAnyDatabase,
        ],
    },
    mongodb_exporter: {
        db: "admin",
        user: "mongodb_exporter",
        roles: [
            clusterMonitor, //
            ldb$$monitorSystem,
        ],
    },
    mongosqld: {
        db: "admin",
        user: "mongosqld",
        roles: [
            ldb$$public, //
            readAnyDatabase,
        ],
    },
    prefix_readonly: {
        db: "admin",
        user: `${prefix}_readonly`,
        roles: [
            ldb$$public, //
            prefix_log$read(prefix),
            prefix_member$read(prefix),
            prefix_minigame$read(prefix),
            prefix_minigame_rm$read(prefix),
            prefix_summary$read(prefix),
        ],
    },
};

module.exports = mixedUsers;
