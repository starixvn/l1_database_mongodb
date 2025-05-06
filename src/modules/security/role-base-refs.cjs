// @ts-check
const { definitionToRef } = require("./security-utils.cjs");
const {
    ldb$clusterWatcher, // -
    ldb$public,
    ldb$monitorSystem,
    ldb$readSystem,
    ldb$writeConfigs,

    ldb$minigameReadConfigs,

    ldb$tmpReadWrite,
    ldb$tmpMaintenance,

    biSchema,
} = require("./role-base-defs.cjs");

/** @satisfies { Record<string, Role> } */
const roleReferences = /** @type {const} */ ({
    ldb$clusterWatcher: definitionToRef(ldb$clusterWatcher),
    ldb$public: definitionToRef(ldb$public),
    ldb$monitorSystem: definitionToRef(ldb$monitorSystem),
    ldb$readSystem: definitionToRef(ldb$readSystem),
    ldb$writeConfigs: definitionToRef(ldb$writeConfigs),

    ldb$minigameReadConfigs: definitionToRef(ldb$minigameReadConfigs),

    ldb$tmpReadWrite: definitionToRef(ldb$tmpReadWrite),
    ldb$tmpMaintenance: definitionToRef(ldb$tmpMaintenance),

    biSchema: definitionToRef(biSchema),
});

module.exports = roleReferences;
