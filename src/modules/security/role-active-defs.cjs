// @ts-check
const { db$read, db$readWrite } = require("./role-builtin.cjs");

/** @satisfies { Record<string, RoleDefinition> } */
const roleDefinitions = /** @type {const} */ ({
    lmnArchive$active: {
        db: "admin",
        role: "lmnArchive$active",
        roles: [
            db$readWrite("log"), //
            db$readWrite("member"),
            db$readWrite("minigame"),
            db$readWrite("minigame_rm"),
            db$read("ops_configs"),
            db$readWrite("summary"),
        ],
        privileges: [],
    },
    lmnBackend$active: {
        db: "admin",
        role: "lmnBackend$active",
        roles: [
            db$readWrite("log"), //
            db$readWrite("member"),
            db$readWrite("minigame"),
            db$readWrite("minigame_rm"),
            db$readWrite("ops_configs"),
            db$read("summary"),
        ],
        privileges: [],
    },
    lmnReadonly$active: {
        db: "admin",
        role: "lmnReadonly$active",
        roles: [
            db$read("log"), //
            db$read("member"),
            db$read("minigame"),
            db$read("minigame_backup"),
            db$read("minigame_rm"),
            db$read("ops_configs"),
            db$read("Proteus"),
            db$read("summary"),
        ],
        privileges: [],
    },
    lmnSummary$active: {
        db: "admin",
        role: "lmnSummary$active",
        roles: [
            db$readWrite("log"), //
            db$readWrite("minigame"),
            db$read("ops_configs"),
            db$readWrite("Proteus"),
            db$readWrite("summary"),
        ],
        privileges: [],
    },
});

module.exports = roleDefinitions;
