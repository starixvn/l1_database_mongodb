// @ts-check

/** @satisfies { Record<string, Role> } */
const builtinClusterRoles = /** @type {const} */ ({
    clusterAdmin: { db: "admin", role: "clusterAdmin" },
    clusterManager: { db: "admin", role: "clusterManager" },
    clusterMonitor: { db: "admin", role: "clusterMonitor" },
    directShardOperations: { db: "admin", role: "directShardOperations" },
    enableSharding: { db: "admin", role: "enableSharding" },
    hostManager: { db: "admin", role: "hostManager" },
    backup: { db: "admin", role: "backup" },
    restore: { db: "admin", role: "restore" },
    readAnyDatabase: { db: "admin", role: "readAnyDatabase" },
    readWriteAnyDatabase: { db: "admin", role: "readWriteAnyDatabase" },
    userAdminAnyDatabase: { db: "admin", role: "userAdminAnyDatabase" },
    dbAdminAnyDatabase: { db: "admin", role: "dbAdminAnyDatabase" },
    root: { db: "admin", role: "root" },
});

/** @satisfies { Record<string, (db: string) => Role> } */
const builtinDbRoles = /** @type {const} */ {
    db$read: /** @template {string} T @param {T} db */ (db) => /** @type {const} */ ({ db, role: "read" }),
    db$readWrite: /** @template {string} T @param {T} db */ (db) => /** @type {const} */ ({ db, role: "readWrite" }),
    db$dbAdmin: /** @template {string} T @param {T} db */ (db) => /** @type {const} */ ({ db, role: "dbAdmin" }),
    db$dbOwner: /** @template {string} T @param {T} db */ (db) => /** @type {const} */ ({ db, role: "dbOwner" }),
    db$userAdmin: /** @template {string} T @param {T} db */ (db) => /** @type {const} */ ({ db, role: "userAdmin" }),
};

module.exports = { ...builtinClusterRoles, ...builtinDbRoles };
