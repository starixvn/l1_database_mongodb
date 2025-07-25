// @ts-check

/** @satisfies { Pick<CreateCollectionOptions, "storageEngine"> } */
const STORAGE_COMPRESSED = /** @type {const} */ ({
    storageEngine: { wiredTiger: { configString: "block_compressor=zstd" } },
});

/** @satisfies { Record<string, Collation> } */
const LOCALES = /** @type {const} */ ({
    simple: { locale: "simple" },
    en: { locale: "en", strength: 2 },
});

/** @satisfies { Pick<CreateCollectionOptions, "collation"> } */
const COLLATION_EN = /** @type {const} */ ({ collation: LOCALES.en });

module.exports = { STORAGE_COMPRESSED, COLLATION_EN, LOCALES };
