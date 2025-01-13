// @ts-check
const { definitionToRef } = require("./security-utils.cjs");
const { lmnArchive$active, lmnBackend$active, lmnReadonly$active, lmnSummary$active } = require("./role-active-defs.cjs");

/** @satisfies { Record<string, Role> } */
const roleReferences = /** @type {const} */ ({
    lmnArchive$active: definitionToRef(lmnArchive$active),
    lmnBackend$active: definitionToRef(lmnBackend$active),
    lmnReadonly$active: definitionToRef(lmnReadonly$active),
    lmnSummary$active: definitionToRef(lmnSummary$active),
});

module.exports = roleReferences;
