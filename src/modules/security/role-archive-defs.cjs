// @ts-check
const { db$read, db$readWrite } = require("./role-builtin.cjs");

/** @satisfies { Record<string, RoleDefinition> } */
const roleDefinitions = /** @type {const} */ ({
    lmnArchive$archive: {
        db: "admin",
        role: "lmnArchive$archive",
        roles: [
            db$readWrite("log_arc"), //
            db$readWrite("member_arc"),
            db$readWrite("minigame_arc"),
            db$readWrite("minigame_rm"),
            db$read("ops_configs"),
            db$readWrite("summary_arc"),
        ],
        privileges: [],
    },
    lmnBackend$archive: {
        db: "admin",
        role: "lmnBackend$archive",
        roles: [
            db$read("log_arc"), //
            db$read("member_arc"),
            db$read("minigame_arc"),
            db$read("minigame_rm"),
            db$read("ops_configs"),
            db$read("summary_arc"),
        ],
        privileges: [],
    },
    lmnReadonly$archive: {
        db: "admin",
        role: "lmnReadonly$archive",
        roles: [
            db$read("log_arc"), //
            db$read("member_arc"),
            db$read("minigame_arc"),
            db$read("minigame_rm"),
            db$read("ops_configs"),
            db$read("Proteus"),
            db$read("summary_arc"),
        ],
        privileges: [],
    },
    lmnSummary$archive: {
        db: "admin",
        role: "lmnSummary$archive",
        roles: [
            db$readWrite("log_arc"), //
            db$readWrite("minigame_arc"),
            db$read("ops_configs"),
            db$readWrite("Proteus"),
            db$readWrite("summary_arc"),
        ],
        privileges: [],
    },
});

module.exports = roleDefinitions;
