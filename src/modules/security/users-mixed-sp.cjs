// @ts-check
const { ldb$public, biSchema } = require("./role-base-refs.cjs");
const { hotdogArchive$active, hotdogBackend$active, hotdogReadonly$active, hotdogSummary$active } = require("./role-active-refs-sp.cjs");
const { hotdogArchive$archive, hotdogBackend$archive, hotdogReadonly$archive, hotdogSummary$archive } = require("./role-archive-refs-sp.cjs");

/** @satisfies { Record<string, UserDefinition> } */
const activeUsers = /** @type {const} */ ({
    hotdog_archive: {
        db: "admin",
        user: "hotdog_archive",
        roles: [
            ldb$public, //
            hotdogArchive$active,
            hotdogArchive$archive,
        ],
    },
    hotdog_backend: {
        db: "admin",
        user: "hotdog_backend",
        roles: [
            ldb$public, //
            hotdogBackend$active,
            hotdogBackend$archive,
        ],
    },
    hotdog_readonly: {
        db: "admin",
        user: "hotdog_readonly",
        roles: [
            ldb$public, //
            hotdogReadonly$active,
            hotdogReadonly$archive,
        ],
    },
    mongosqld: {
        db: "admin",
        user: "mongosqld",
        roles: [
            ldb$public, //
            hotdogReadonly$active,
            hotdogReadonly$archive,
            biSchema,
        ],
    },
    lmn_readonly: {
        db: "admin",
        user: "lmn_readonly",
        roles: [
            ldb$public, //
            hotdogReadonly$active,
            hotdogReadonly$archive,
        ],
    },
    lmn_summary: {
        db: "admin",
        user: "lmn_summary",
        roles: [
            ldb$public, //
            hotdogSummary$active,
            hotdogSummary$archive,
        ],
    },
});

module.exports = activeUsers;
