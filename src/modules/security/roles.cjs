/** @satisfies { Record<string, Role> } */
const roles = /** @type {const} */ ({
    clusterMonitor: { db: "admin", role: "clusterMonitor" },
    dbOwner: { db: "admin", role: "dbOwner" },
    readAnyDatabase: { db: "admin", role: "readAnyDatabase" },
    readWriteAnyDatabase: { db: "admin", role: "readWriteAnyDatabase" },
    root: { db: "admin", role: "root" },

    ldb$$public: { db: "admin", role: "public" },
    ldb$$monitorSystem: { db: "admin", role: "monitorSystem" },
    ldb$$readSystem: { db: "admin", role: "readSystem" },

    config$dbOwner: { db: "config", role: "dbOwner" },
    local$dbOwner: { db: "local", role: "dbOwner" },

    archive$read: { db: "archive", role: "read" },

    bi$read: { db: "bi", role: "read" },

    log$read: { db: "log", role: "read" },
    log$readWrite: { db: "log", role: "readWrite" },

    log_arc$read: { db: "log_arc", role: "read" },
    log_arc$readWrite: { db: "log_arc", role: "readWrite" },

    member$read: { db: "member", role: "read" },
    member$readWrite: { db: "member", role: "readWrite" },

    member_arc$read: { db: "member_arc", role: "read" },
    member_arc$readWrite: { db: "member_arc", role: "readWrite" },

    minigame$read: { db: "minigame", role: "read" },
    minigame$readWrite: { db: "minigame", role: "readWrite" },

    minigame_arc$read: { db: "minigame_arc", role: "read" },
    minigame_arc$readWrite: { db: "minigame_arc", role: "readWrite" },

    minigame_rm$read: { db: "minigame_rm", role: "read" },
    minigame_rm$readWrite: { db: "minigame_rm", role: "readWrite" },

    ops_configs$read: { db: "ops_configs", role: "read" },
    ops_configs$readWrite: { db: "ops_configs", role: "readWrite" },

    Proteus$read: { db: "Proteus", role: "read" },
    Proteus$readWrite: { db: "Proteus", role: "readWrite" },

    schema$read: { db: "schema", role: "read" },
    schema$readWrite: { db: "schema", role: "readWrite" },

    summary$read: { db: "summary", role: "read" },
    summary$readWrite: { db: "summary", role: "readWrite" },

    summary_arc$read: { db: "summary_arc", role: "read" },
    summary_arc$readWrite: { db: "summary_arc", role: "readWrite" },

    demo$readWrite: { db: "demo", role: "readWrite" },

    prefix_log$read: (prefix) => /** @type {const} */ ({ db: `${prefix}_log`, role: "read" }),
    prefix_log$readWrite: (prefix) => /** @type {const} */ ({ db: `${prefix}_log`, role: "readWrite" }),

    prefix_log_arc$read: (prefix) => /** @type {const} */ ({ db: `${prefix}_log_arc`, role: "read" }),
    prefix_log_arc$readWrite: (prefix) => /** @type {const} */ ({ db: `${prefix}_log_arc`, role: "readWrite" }),

    prefix_member$read: (prefix) => /** @type {const} */ ({ db: `${prefix}_member`, role: "read" }),
    prefix_member$readWrite: (prefix) => /** @type {const} */ ({ db: `${prefix}_member`, role: "readWrite" }),

    prefix_member_arc$read: (prefix) => /** @type {const} */ ({ db: `${prefix}_member_arc`, role: "read" }),
    prefix_member_arc$readWrite: (prefix) => /** @type {const} */ ({ db: `${prefix}_member_arc`, role: "readWrite" }),

    prefix_minigame$read: (prefix) => /** @type {const} */ ({ db: `${prefix}_minigame`, role: "read" }),
    prefix_minigame$readWrite: (prefix) => /** @type {const} */ ({ db: `${prefix}_minigame`, role: "readWrite" }),

    prefix_minigame_arc$read: (prefix) => /** @type {const} */ ({ db: `${prefix}_minigame_arc`, role: "read" }),
    prefix_minigame_arc$readWrite: (prefix) => /** @type {const} */ ({ db: `${prefix}_minigame_arc`, role: "readWrite" }),

    prefix_minigame_rm$read: (prefix) => /** @type {const} */ ({ db: `${prefix}_minigame_rm`, role: "read" }),
    prefix_minigame_rm$readWrite: (prefix) => /** @type {const} */ ({ db: `${prefix}_minigame_rm`, role: "readWrite" }),

    prefix_summary$read: (prefix) => /** @type {const} */ ({ db: `${prefix}_summary`, role: "read" }),
    prefix_summary$readWrite: (prefix) => /** @type {const} */ ({ db: `${prefix}_summary`, role: "readWrite" }),

    prefix_summary_arc$read: (prefix) => /** @type {const} */ ({ db: `${prefix}_summary_arc`, role: "read" }),
    prefix_summary_arc$readWrite: (prefix) => /** @type {const} */ ({ db: `${prefix}_summary_arc`, role: "readWrite" }),
});

module.exports = roles;
