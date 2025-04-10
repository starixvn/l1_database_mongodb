// @ts-check
const { definitionToRef } = require("./security-utils.cjs");
const {
    ldb$clusterWatcher, // -
    ldb$public,
    ldb$monitorSystem,
    ldb$readSystem,

    ldb$tmpReadWrite,

    biSchema,
} = require("./role-base-defs.cjs");

/** @satisfies { Record<string, Role> } */
const roleReferences = /** @type {const} */ ({
    ldb$clusterWatcher: definitionToRef(ldb$clusterWatcher),
    ldb$public: definitionToRef(ldb$public),
    ldb$monitorSystem: definitionToRef(ldb$monitorSystem),
    ldb$readSystem: definitionToRef(ldb$readSystem),

    ldb$tmpReadWrite: definitionToRef(ldb$tmpReadWrite),

    biSchema: definitionToRef(biSchema),
});

module.exports = roleReferences;
