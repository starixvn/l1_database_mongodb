// @ts-check
const { biSchema, ldb$public } = require("./role-base-refs.cjs");
const { lmnArchive$active, lmnBackend$active, lmnReadonly$active, lmnSummary$active } = require("./role-active-refs.cjs");
const { lmnArchive$archive, lmnBackend$archive, lmnReadonly$archive, lmnSummary$archive } = require("./role-archive-refs.cjs");

/** @satisfies { Record<string, UserDefinition> } */
const mixedUsers = /** @type {const} */ ({
    lmn_archive: {
        db: "admin",
        user: "lmn_archive",
        roles: [
            ldb$public, //
            lmnArchive$active,
            lmnArchive$archive,
        ],
    },
    lmn_backend: {
        db: "admin",
        user: "lmn_backend",
        roles: [
            ldb$public, //
            lmnBackend$active,
            lmnBackend$archive,
        ],
    },
    lmn_readonly: {
        db: "admin",
        user: "lmn_readonly",
        roles: [
            ldb$public, //
            lmnReadonly$active,
            lmnReadonly$archive,
        ],
    },
    lmn_summary: {
        db: "admin",
        user: "lmn_summary",
        roles: [
            ldb$public, //
            lmnSummary$active,
            lmnSummary$archive,
        ],
    },
    mongosqld: {
        db: "admin",
        user: "mongosqld",
        roles: [
            ldb$public, //
            lmnReadonly$active,
            lmnReadonly$archive,
            biSchema,
        ],
    },
    svc_readonly: {
        db: "admin",
        user: "svc_readonly",
        roles: [
            ldb$public, //
            lmnReadonly$active,
        ],
    },
});

module.exports = mixedUsers;
