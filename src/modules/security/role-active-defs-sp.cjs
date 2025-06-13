// @ts-check
const { operatorArchive$active, operatorBackend$active, operatorReadonly$active, operatorSummary$active } = require("./role-templates.cjs");
const { db$readWrite, db$read } = require("./role-builtin.cjs");

/** @satisfies { Record<string, RoleDefinition> } */
const roleDefinitions = /** @type {const} */ ({
    hotdogArchive$active: operatorArchive$active("hotdog"),
    hotdogBackend$active: operatorBackend$active("hotdog"),
    hotdogReadonly$active: operatorReadonly$active("hotdog"),
    hotdogSummary$active: operatorSummary$active("hotdog"),

    marbleArchive$active: {
        db: "admin",
        role: "marbleArchive$active",
        roles: [db$readWrite("marble_odds_feed"), db$read(`ops_configs`)],
        privileges: [],
    },
    marbleBackend$active: {
        db: "admin",
        role: "marbleBackend$active",
        roles: [db$readWrite("marble_odds_feed")],
        privileges: [],
    },
    marbleReadonly$active: {
        db: "admin",
        role: "marbleReadonly$active",
        roles: [db$read("marble_odds_feed")],
        privileges: [],
    },
});

module.exports = roleDefinitions;
