// @ts-check
const { definitionToRef } = require("./security-utils.cjs");
const {
    ldb$public,
    ldb$monitorSystem,
    ldb$readSystem,

    biSchema,
} = require("./role-base-defs.cjs");

/** @satisfies { Record<string, Role> } */
const roleReferences = /** @type {const} */ ({
    ldb$public: definitionToRef(ldb$public),
    ldb$monitorSystem: definitionToRef(ldb$monitorSystem),
    ldb$readSystem: definitionToRef(ldb$readSystem),

    biSchema: definitionToRef(biSchema),
});

module.exports = roleReferences;
