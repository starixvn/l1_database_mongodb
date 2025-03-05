// @ts-check
const { definitionToRef } = require("./security-utils.cjs");
const {
    ldb$clusterWatcher,
    ldb$public,
    ldb$monitorSystem,
    ldb$readSystem,

    biSchema,
} = require("./role-base-defs.cjs");

/** @satisfies { Record<string, Role> } */
const roleReferences = /** @type {const} */ ({
    ldb$clusterWatcher: definitionToRef(ldb$clusterWatcher),
    ldb$public: definitionToRef(ldb$public),
    ldb$monitorSystem: definitionToRef(ldb$monitorSystem),
    ldb$readSystem: definitionToRef(ldb$readSystem),

    biSchema: definitionToRef(biSchema),
});

module.exports = roleReferences;
