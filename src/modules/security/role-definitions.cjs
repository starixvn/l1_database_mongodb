const { monitorAllCollections, readIdentity, readSystemObjects, backupCluster } = require("./privileges.cjs");
const { readAnyDatabase } = require("./roles.cjs");

/** @satisfies { Record<string, RoleDefinition> } */
const roleDefinitions = /** @type {const} */ ({
    public: {
        db: "admin",
        role: "public",
        roles: [],
        privileges: readIdentity,
    },
    monitorSystem: {
        db: "admin",
        role: "monitorSystem",
        roles: [],
        privileges: monitorAllCollections,
    },
    readSystem: {
        db: "admin",
        role: "readSystem",
        roles: [readAnyDatabase],
        privileges: [...backupCluster, ...readSystemObjects],
    },
});

module.exports = roleDefinitions;
