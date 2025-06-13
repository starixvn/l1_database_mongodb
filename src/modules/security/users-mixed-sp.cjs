// @ts-check
const { ldb$public, biSchema } = require("./role-base-refs.cjs");
const {
    hotdogArchive$active,
    hotdogBackend$active,
    hotdogReadonly$active,
    hotdogSummary$active,
    marbleBackend$active,
    marbleReadonly$active,
    marbleArchive$active,
} = require("./role-active-refs-sp.cjs");
const { hotdogArchive$archive, hotdogBackend$archive, hotdogReadonly$archive, hotdogSummary$archive, marbleArchive$archive } = require("./role-archive-refs-sp.cjs");

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
    lmn_archive: {
        db: "admin",
        user: "lmn_archive",
        roles: [
            ldb$public, //
            hotdogArchive$active,
            hotdogArchive$archive,
            marbleArchive$active,
            marbleArchive$archive,
        ],
    },
    lmn_backend: {
        db: "admin",
        user: "lmn_backend",
        roles: [
            ldb$public, //
            hotdogBackend$active,
            hotdogBackend$archive,
        ],
    },
    lmn_readonly: {
        db: "admin",
        user: "lmn_readonly",
        roles: [
            ldb$public, //
            hotdogReadonly$active,
            hotdogReadonly$archive,
            marbleReadonly$active,
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

    marble_backend: {
        db: "admin",
        user: "marble_backend",
        roles: [
            ldb$public, //
            marbleBackend$active,
        ],
    },
    marble_readonly: {
        db: "admin",
        user: "marble_readonly",
        roles: [
            ldb$public, //
            marbleReadonly$active,
        ],
    },
});

module.exports = activeUsers;
