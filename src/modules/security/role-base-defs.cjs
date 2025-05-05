// @ts-check
const { monitorAllCollections, readIdentity, readSystemObjects, backupCluster, clusterChangeStream, indexMaintenance, writeConfigs } = require("./privileges.cjs");
const { readAnyDatabase, db$readWrite } = require("./role-builtin.cjs");
const { db$read } = require("./role-builtin.cjs");

/** @satisfies { Record<string, RoleDefinition> } */
const roleDefinitions = /** @type {const} */ ({
    ldb$clusterWatcher: {
        db: "admin",
        role: "clusterWatcher",
        roles: [],
        privileges: clusterChangeStream,
    },
    ldb$public: {
        db: "admin",
        role: "public",
        roles: [],
        privileges: readIdentity,
    },
    ldb$monitorSystem: {
        db: "admin",
        role: "monitorSystem",
        roles: [],
        privileges: monitorAllCollections,
    },
    ldb$readSystem: {
        db: "admin",
        role: "readSystem",
        roles: [readAnyDatabase],
        privileges: [...backupCluster, ...readSystemObjects],
    },
    ldb$writeConfigs: {
        db: "admin",
        role: "writeConfigs",
        roles: [
            db$readWrite("sync"), //
        ],
        privileges: writeConfigs,
    },

    ldb$tmpReadWrite: {
        db: "admin",
        role: "#readWriteAnyDatabase",
        roles: [{ db: "admin", role: "readWriteAnyDatabase" }],
        privileges: [],
    },
    ldb$tmpMaintenance: {
        db: "admin",
        role: "#maintenance",
        roles: [],
        privileges: [...indexMaintenance],
    },

    biSchema: {
        db: "admin",
        role: "biSchema",
        roles: [
            db$read("bi"), //
            db$read("schema"),
        ],
        privileges: [],
    },
});

module.exports = roleDefinitions;
