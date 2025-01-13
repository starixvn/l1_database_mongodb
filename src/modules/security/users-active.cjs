// @ts-check
const { ldb$public, biSchema } = require("./role-base-refs.cjs");
const { lmnArchive$active, lmnReadonly$active, lmnBackend$active, lmnSummary$active } = require("./role-active-refs.cjs");

/** @satisfies { Record<string, UserDefinition> } */
const activeUsers = /** @type {const} */ ({
    lmn_archive: {
        db: "admin",
        user: "lmn_archive",
        roles: [
            ldb$public, //
            lmnArchive$active,
        ],
    },
    lmn_backend: {
        db: "admin",
        user: "lmn_backend",
        roles: [
            ldb$public, //
            lmnBackend$active,
        ],
    },
    lmn_readonly: {
        db: "admin",
        user: "lmn_readonly",
        roles: [
            ldb$public, //
            lmnReadonly$active,
        ],
    },
    lmn_summary: {
        db: "admin",
        user: "lmn_summary",
        roles: [
            ldb$public, //
            lmnSummary$active,
        ],
    },
    mongosqld: {
        db: "admin",
        user: "mongosqld",
        roles: [
            ldb$public, //
            lmnReadonly$active,
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

module.exports = activeUsers;
