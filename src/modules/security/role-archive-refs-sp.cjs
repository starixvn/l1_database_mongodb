// @ts-check
const { definitionToRef } = require("./security-utils.cjs");
const { hotdogArchive$archive, hotdogBackend$archive, hotdogReadonly$archive, hotdogSummary$archive, marbleArchive$archive } = require("./role-archive-defs-sp.cjs");

/** @satisfies { Record<string, Role> } */
const roleReferences = /** @type {const} */ ({
    hotdogArchive$archive: definitionToRef(hotdogArchive$archive),
    hotdogBackend$archive: definitionToRef(hotdogBackend$archive),
    hotdogReadonly$archive: definitionToRef(hotdogReadonly$archive),
    hotdogSummary$archive: definitionToRef(hotdogSummary$archive),

    marbleArchive$archive: definitionToRef(marbleArchive$archive),
});

module.exports = roleReferences;
