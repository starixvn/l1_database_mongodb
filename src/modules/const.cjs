// @ts-check

/** @satisfies { Pick<CreateCollectionOptions, "storageEngine"> } */
const STORAGE_COMPRESSED = { storageEngine: { wiredTiger: { configString: "block_compressor=zstd" } } };

/** @satisfies { Record<string, Collation> } */
const LOCALES = {
    simple: { locale: "simple" },
    en: { locale: "en", strength: 2 },
};

/** @satisfies { Pick<CreateCollectionOptions, "collation"> } */
const COLLATION_EN = { collation: LOCALES.en };

module.exports = { STORAGE_COMPRESSED, COLLATION_EN, LOCALES };
