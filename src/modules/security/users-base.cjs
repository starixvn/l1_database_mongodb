// @ts-check
const { root, clusterMonitor } = require("./role-builtin.cjs");
const { ldb$readSystem, ldb$monitorSystem, ldb$clusterWatcher, ldb$logRotate, ldb$gaia, n8n$bfs } = require("./role-base-refs.cjs");

/** @satisfies { Record<string, UserDefinition> } */
const baseUsers = /** @type {const} */ ({
    billy$admin: {
        db: "admin",
        user: "billy.bui",
        roles: [
            root, // -
            ldb$gaia,
        ],
    },
    lmn_backup: {
        db: "admin",
        user: "lmn_backup",
        roles: [
            ldb$readSystem, // -
        ],
    },
    lmn_watcher: {
        db: "admin",
        user: "lmn_watcher",
        roles: [
            ldb$clusterWatcher, // -
        ],
    },
    mongodb_exporter: {
        db: "admin",
        user: "mongodb_exporter",
        roles: [
            clusterMonitor, // -
            ldb$monitorSystem,
        ],
    },
    logRotater: {
        db: "admin",
        user: "logRotater",
        roles: [
            ldb$logRotate, // -
        ],
    },

    n8n$bfs: {
        db: "admin",
        user: "n8n$bfs",
        roles: [
            n8n$bfs, // -
        ],
    },
});

module.exports = baseUsers;
