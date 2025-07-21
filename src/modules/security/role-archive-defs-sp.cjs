// @ts-check
const { operatorArchive$archive, operatorBackend$archive, operatorReadonly$archive, operatorSummary$archive } = require("./role-templates.cjs");
const { db$readWrite, db$read } = require("./role-builtin.cjs");

/** @satisfies { Record<string, RoleDefinition> } */
const roleDefinitions = /** @type {const} */ ({
    hotdogArchive$archive: operatorArchive$archive("hotdog"),
    hotdogBackend$archive: operatorBackend$archive("hotdog"),
    hotdogReadonly$archive: operatorReadonly$archive("hotdog"),
    hotdogSummary$archive: operatorSummary$archive("hotdog"),

    marbleArchive$archive: {
        db: "admin",
        role: "marbleArchive$archive",
        roles: [db$readWrite("marble_odds_feed_arc"), db$read(`ops_configs`)],
        privileges: [],
    },
});

module.exports = roleDefinitions;
