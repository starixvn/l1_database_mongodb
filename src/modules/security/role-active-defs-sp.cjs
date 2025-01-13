// @ts-check
const { operatorArchive$active, operatorBackend$active, operatorReadonly$active, operatorSummary$active } = require("./role-templates.cjs");

/** @satisfies { Record<string, RoleDefinition> } */
const roleDefinitions = /** @type {const} */ ({
    hotdogArchive$active: operatorArchive$active("hotdog"),
    hotdogBackend$active: operatorBackend$active("hotdog"),
    hotdogReadonly$active: operatorReadonly$active("hotdog"),
    hotdogSummary$active: operatorSummary$active("hotdog"),
});

module.exports = roleDefinitions;
