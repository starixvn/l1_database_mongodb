// @ts-check
const { operatorArchive$archive, operatorBackend$archive, operatorReadonly$archive, operatorSummary$archive } = require("./role-templates.cjs");

/** @satisfies { Record<string, RoleDefinition> } */
const roleDefinitions = /** @type {const} */ ({
    hotdogArchive$archive: operatorArchive$archive("hotdog"),
    hotdogBackend$archive: operatorBackend$archive("hotdog"),
    hotdogReadonly$archive: operatorReadonly$archive("hotdog"),
    hotdogSummary$archive: operatorSummary$archive("hotdog"),
});

module.exports = roleDefinitions;
