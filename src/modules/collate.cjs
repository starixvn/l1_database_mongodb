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
    const mergedCollate = /** @type { Collation } */ ({ ...DEFAULT_COLLATE, ...collate });
    delete mergedCollate["version"];
    return mergedCollate;
};

/** @param { CollationOptions } [collation] */
const getCollationSimpleName = (collation = DEFAULT_COLLATE) => {
    const { locale, strength } = getCollate(collation);

    if (locale === "simple") {
        return "";
    }

    if ((strength ?? 3) === 3) {
        return locale;
    }

    return `${locale}_${strength}`;
};

module.exports = { DEFAULT_COLLATE, getCollate, getCollationSimpleName };
