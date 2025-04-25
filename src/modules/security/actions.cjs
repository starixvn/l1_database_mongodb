// @ts-check

/** @satisfies { Record<string, PrivilegeAction[]> } */
const actions = /** @type {const} */ ({
    list: ["listDatabases", "listCollections"],
    monitor: ["collStats", "indexStats"],
    read: ["find", "listIndexes"],
    backup: ["fsync", "getCmdLineOpts", "replSetGetStatus", "unlock"],
    index: ["createIndex", "dropIndex", "listIndexes", "indexStats"],
});

module.exports = actions;
