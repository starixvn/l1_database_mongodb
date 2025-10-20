// @ts-check
const { definitionToRef } = require("./security-utils.cjs");
const {
    ldb$gaia,
    ldb$clusterWatcher,
    ldb$public,
    ldb$monitorSystem,
    ldb$readSystem,
    ldb$writeConfigs,
    ldb$logRotate,

    ldb$minigameReadConfigs,

    ldb$tmpReadWrite,
    ldb$tmpMaintenance,

    biSchema,
    n8n$bfs,
} = require("./role-base-defs.cjs");

/** @satisfies { Record<string, Role> } */
const roleReferences = /** @type {const} */ ({
    ldb$gaia: definitionToRef(ldb$gaia),
    ldb$clusterWatcher: definitionToRef(ldb$clusterWatcher),
    ldb$public: definitionToRef(ldb$public),
    ldb$monitorSystem: definitionToRef(ldb$monitorSystem),
    ldb$readSystem: definitionToRef(ldb$readSystem),
    ldb$writeConfigs: definitionToRef(ldb$writeConfigs),
    ldb$logRotate: definitionToRef(ldb$logRotate),

    ldb$minigameReadConfigs: definitionToRef(ldb$minigameReadConfigs),

    ldb$tmpReadWrite: definitionToRef(ldb$tmpReadWrite),
    ldb$tmpMaintenance: definitionToRef(ldb$tmpMaintenance),

    biSchema: definitionToRef(biSchema),

    n8n$bfs: definitionToRef(n8n$bfs),
});

module.exports = roleReferences;
