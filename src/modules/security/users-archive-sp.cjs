// @ts-check
const { ldb$public, biSchema } = require("./role-base-refs.cjs");
const { hotdogArchive$archive, hotdogBackend$archive, hotdogReadonly$archive, hotdogSummary$archive, marbleArchive$archive } = require("./role-archive-refs-sp.cjs");

/** @satisfies { Record<string, UserDefinition> } */
const activeUsers = /** @type {const} */ ({
    hotdog_archive: {
        db: "admin",
        user: "hotdog_archive",
        roles: [
            ldb$public, //
            hotdogArchive$archive,
        ],
    },
    hotdog_backend: {
        db: "admin",
        user: "hotdog_backend",
        roles: [
            ldb$public, //
            hotdogBackend$archive,
        ],
    },
    hotdog_readonly: {
        db: "admin",
        user: "hotdog_readonly",
        roles: [
            ldb$public, //
            hotdogReadonly$archive,
        ],
    },
    mongosqld: {
        db: "admin",
        user: "mongosqld",
        roles: [
            ldb$public, //
            hotdogReadonly$archive,
            biSchema,
        ],
    },
    lmn_archive: {
        db: "admin",
        user: "lmn_archive",
        roles: [
            ldb$public, //
            hotdogArchive$archive,
            marbleArchive$archive,
        ],
    },
    lmn_backend: {
        db: "admin",
        user: "lmn_backend",
        roles: [
            ldb$public, //
            hotdogBackend$archive,
        ],
    },
    lmn_readonly: {
        db: "admin",
        user: "lmn_readonly",
        roles: [
            ldb$public, //
            hotdogReadonly$archive,
        ],
    },
    lmn_summary: {
        db: "admin",
        user: "lmn_summary",
        roles: [
            ldb$public, //
            hotdogSummary$archive,
        ],
    },
});

module.exports = activeUsers;
