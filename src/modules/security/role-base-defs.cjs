// @ts-check
const { monitorAllCollections, readIdentity, readSystemObjects, backupCluster } = require("./privileges.cjs");
const { readAnyDatabase } = require("./role-builtin.cjs");
const { db$read } = require("./role-builtin.cjs");

/** @satisfies { Record<string, RoleDefinition> } */
const roleDefinitions = /** @type {const} */ ({
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
