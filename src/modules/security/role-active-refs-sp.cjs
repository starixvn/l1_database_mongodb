// @ts-check
const { definitionToRef } = require("./security-utils.cjs");
const { hotdogArchive$active, hotdogBackend$active, hotdogReadonly$active, hotdogSummary$active } = require("./role-active-defs-sp.cjs");

/** @satisfies { Record<string, Role> } */
const roleReferences = /** @type {const} */ ({
    hotdogArchive$active: definitionToRef(hotdogArchive$active),
    hotdogBackend$active: definitionToRef(hotdogBackend$active),
    hotdogReadonly$active: definitionToRef(hotdogReadonly$active),
    hotdogSummary$active: definitionToRef(hotdogSummary$active),
});

module.exports = roleReferences;
