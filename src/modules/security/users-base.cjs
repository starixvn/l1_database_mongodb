// @ts-check
const { db$dbOwner, root, clusterMonitor } = require("./role-builtin.cjs");
const { ldb$readSystem, ldb$monitorSystem, ldb$clusterWatcher } = require("./role-base-refs.cjs");

/** @satisfies { Record<string, UserDefinition> } */
const baseUsers = /** @type {const} */ ({
    billy$admin: {
        db: "admin",
        user: "billy.bui",
        roles: [
            root, //
            db$dbOwner("admin"),
            db$dbOwner("config"),
            db$dbOwner("local"),
        ],
    },
    lmn_backup: {
        db: "admin",
        user: "lmn_backup",
        roles: [
            ldb$readSystem, //
        ],
    },
    lmn_watcher: {
        db: "admin",
        user: "lmn_watcher",
        roles: [
            ldb$clusterWatcher, //
        ],
    },
    mongodb_exporter: {
        db: "admin",
        user: "mongodb_exporter",
        roles: [
            clusterMonitor, //
            ldb$monitorSystem,
        ],
    },
});

module.exports = baseUsers;
