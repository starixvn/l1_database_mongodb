/**
 * @const
 * @satisfies { CollationOptions }
 */
const DEFAULT_COLLATE = /** @type { const } */ ({
    locale: "simple",
    caseLevel: false,
    caseFirst: "off",
    strength: 3,
    numericOrdering: false,
    alternate: "non-ignorable",
    maxVariable: "punct",
    normalization: false,
    backwards: false,
});

/**
 * @param { CollationOptions } [collate]
 */
const getCollate = (collate = DEFAULT_COLLATE) => {
    return /** @type { Collation } */ ({ ...DEFAULT_COLLATE, ...collate });
};

module.exports = { DEFAULT_COLLATE, getCollate };
