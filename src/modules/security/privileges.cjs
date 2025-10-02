// @ts-check

const { monitor, read, list, backup, index, readWrite } = require("./actions.cjs");

/** @satisfies { Record<string, Privilege[]> } */
const privileges = /** @type {const} */ ({
    readIdentity: [
        { resource: { db: "admin", collection: "identity" }, actions: read }, //
    ],
    monitorAllCollections: [
        { resource: { db: "", collection: "" }, actions: [...monitor, ...list] },
        { resource: { db: "", collection: "system.js" }, actions: monitor },
        { resource: { db: "", collection: "system.profile" }, actions: monitor },
        { resource: { db: "", collection: "system.views" }, actions: monitor },
        { resource: { db: "admin", collection: "system.keys" }, actions: monitor },
        { resource: { db: "admin", collection: "system.profile" }, actions: monitor },
        { resource: { db: "admin", collection: "system.roles" }, actions: monitor },
        { resource: { db: "admin", collection: "system.users" }, actions: monitor },
        { resource: { db: "admin", collection: "system.version" }, actions: monitor },
        { resource: { db: "admin", collection: "system.views" }, actions: monitor },
        { resource: { db: "config", collection: "system.profile" }, actions: monitor },
        { resource: { db: "config", collection: "system.sessions" }, actions: monitor },
        { resource: { db: "local", collection: "system.profile" }, actions: monitor },
        { resource: { db: "local", collection: "system.replset" }, actions: monitor },
        { resource: { db: "local", collection: "system.rollback.id" }, actions: monitor },
    ],
    backupCluster: [
        { resource: { cluster: true }, actions: backup }, //
    ],
    readSystemObjects: [
        { resource: { db: "admin", collection: "" }, actions: [...read, ...list] }, //
        { resource: { db: "admin", collection: "system.keys" }, actions: read },
        { resource: { db: "admin", collection: "system.profile" }, actions: read },
        { resource: { db: "admin", collection: "system.roles" }, actions: read },
        { resource: { db: "admin", collection: "system.users" }, actions: read },
        { resource: { db: "admin", collection: "system.version" }, actions: read },
        { resource: { db: "admin", collection: "system.views" }, actions: read },
        { resource: { db: "config", collection: "" }, actions: [...read, ...list] },
        { resource: { db: "config", collection: "system.profile" }, actions: read },
        { resource: { db: "config", collection: "system.sessions" }, actions: read },
        { resource: { db: "local", collection: "" }, actions: [...read, ...list] },
        { resource: { db: "local", collection: "system.profile" }, actions: read },
        { resource: { db: "local", collection: "system.replset" }, actions: read },
        { resource: { db: "local", collection: "system.rollback.id" }, actions: read },
    ],
    clusterChangeStream: [
        { resource: { db: "", collection: "" }, actions: ["find", "changeStream"] }, //
    ],
    indexMaintenance: [
        { resource: { db: "", collection: "" }, actions: [...index] }, //
    ],
    readConfigs: [
        { resource: { db: "minigame", collection: "" }, actions: ["collStats", "listCollections", "listIndexes"] },
        { resource: { db: "minigame", collection: "game_configs" }, actions: read }, //
        { resource: { db: "minigame", collection: "currency_groups" }, actions: read },
        { resource: { db: "minigame", collection: "currencies" }, actions: read },
        { resource: { db: "minigame", collection: "currency_group_games" }, actions: read },
        { resource: { db: "minigame", collection: "chips" }, actions: read },
    ],
    writeConfigs: [
        { resource: { db: "minigame", collection: "game_configs" }, actions: readWrite }, //
        { resource: { db: "minigame", collection: "currency_groups" }, actions: readWrite },
        { resource: { db: "minigame", collection: "currencies" }, actions: readWrite },
        { resource: { db: "minigame", collection: "currency_group_games" }, actions: readWrite },
        { resource: { db: "minigame", collection: "chips" }, actions: readWrite },

        { resource: { db: "minigame_backup", collection: "backup_game_configs" }, actions: readWrite },
        { resource: { db: "minigame_backup", collection: "backup_currency_groups" }, actions: readWrite },
        { resource: { db: "minigame_backup", collection: "backup_currencies" }, actions: readWrite },
        { resource: { db: "minigame_backup", collection: "backup_currency_group_games" }, actions: readWrite },
        { resource: { db: "minigame_backup", collection: "backup_chips" }, actions: readWrite },
    ],
});

module.exports = privileges;
