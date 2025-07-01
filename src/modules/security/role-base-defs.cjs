// @ts-check
const { monitorAllCollections, readIdentity, readSystemObjects, backupCluster, clusterChangeStream, indexMaintenance, writeConfigs, readConfigs } = require("./privileges.cjs");
const { readAnyDatabase, db$readWrite, root, db$dbOwner } = require("./role-builtin.cjs");
const { db$read } = require("./role-builtin.cjs");

/** @satisfies { Record<string, RoleDefinition> } */
const roleDefinitions = /** @type {const} */ ({
    ldb$gaia: {
        db: "admin",
        role: "gaia",
        roles: [
            root, //
            db$dbOwner("admin"),
            db$dbOwner("config"),
            db$dbOwner("local"),
        ],
        privileges: [],
    },
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
    ldb$logRotate: {
        db: "admin",
        role: "logRotate",
        roles: [],
        privileges: [{ resource: { cluster: true }, actions: ["logRotate"] }],
    },

    ldb$minigameReadConfigs: {
        db: "minigame",
        role: "readConfigs",
        roles: [],
        privileges: readConfigs,
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
