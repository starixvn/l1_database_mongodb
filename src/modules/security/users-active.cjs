const {
    archive$read,
    bi$read,
    clusterMonitor,
    config$dbOwner,
    dbOwner,
    ldb$$monitorSystem,
    ldb$$public,
    ldb$$readSystem,
    local$dbOwner,
    log$read,
    log$readWrite,
    member$read,
    member$readWrite,
    minigame$read,
    minigame$readWrite,
    minigame_rm$read,
    minigame_rm$readWrite,
    ops_configs$read,
    Proteus$read,
    Proteus$readWrite,
    root,
    schema$read,
    summary$read,
    summary$readWrite,
} = require("./roles.cjs");

/** @satisfies { Record<string, UserDefinition> } */
const activeUsers = {
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
    lmn_archive: {
        db: "admin",
        user: "lmn_archive",
        roles: [
            ldb$$public, //
            log$readWrite,
            member$readWrite,
            minigame$readWrite,
            ops_configs$read,
            summary$readWrite,
            minigame_rm$readWrite,
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
            Proteus$read,
            archive$read,
            log$read,
            member$read,
            minigame$read,
            ops_configs$read,
            summary$read,
            minigame_rm$read,
        ],
    },
    lmn_summary: {
        db: "admin",
        user: "lmn_summary",
        roles: [
            ldb$$public, //
            Proteus$readWrite,
            log$readWrite,
            minigame$readWrite,
            ops_configs$read,
            summary$readWrite,
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
            Proteus$read,
            bi$read,
            schema$read,
            archive$read,
            log$read,
            member$read,
            minigame$read,
            ops_configs$read,
            summary$read,
            minigame_rm$read,
        ],
    },
    svc_readonly: {
        db: "admin",
        user: "svc_readonly",
        roles: [
            ldb$$public, //
            log$read,
            member$read,
            minigame$read,
            minigame_rm$read,
            summary$read,
        ],
    },
};

module.exports = activeUsers;
