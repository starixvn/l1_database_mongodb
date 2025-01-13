// @ts-check
const { definitionToRef } = require("./security-utils.cjs");
const { lmnArchive$archive, lmnBackend$archive, lmnReadonly$archive, lmnSummary$archive } = require("./role-archive-defs.cjs");

/** @satisfies { Record<string, Role> } */
const roleReferences = /** @type {const} */ ({
    lmnArchive$archive: definitionToRef(lmnArchive$archive),
    lmnBackend$archive: definitionToRef(lmnBackend$archive),
    lmnReadonly$archive: definitionToRef(lmnReadonly$archive),
    lmnSummary$archive: definitionToRef(lmnSummary$archive),
});

module.exports = roleReferences;
