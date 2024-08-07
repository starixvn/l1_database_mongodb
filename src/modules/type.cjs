/** @typedef {import("@ldb/mongo").IndexDescription} IndexDescription */

/** @typedef {Record<string, { key: IndexDescription["key"]; options: Omit<IndexDescription, "key"> }>} IndexConfig */
