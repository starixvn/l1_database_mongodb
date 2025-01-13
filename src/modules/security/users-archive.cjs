// @ts-check
const { ldb$public, biSchema } = require("./role-base-refs.cjs");
const { lmnArchive$archive, lmnBackend$archive, lmnReadonly$archive, lmnSummary$archive } = require("./role-archive-refs.cjs");

/** @satisfies { Record<string, UserDefinition> } */
const archiveUsers = {
    lmn_archive: {
        db: "admin",
        user: "lmn_archive",
        roles: [
            ldb$public, //
            lmnArchive$archive,
        ],
    },
    lmn_backend: {
        db: "admin",
        user: "lmn_backend",
        roles: [
            ldb$public, //
            lmnBackend$archive,
        ],
    },
    lmn_readonly: {
        db: "admin",
        user: "lmn_readonly",
        roles: [
            ldb$public, //
            lmnReadonly$archive,
        ],
    },
    lmn_summary: {
        db: "admin",
        user: "lmn_summary",
        roles: [
            ldb$public, //
            lmnSummary$archive,
        ],
    },
    mongosqld: {
        db: "admin",
        user: "mongosqld",
        roles: [
            ldb$public, //
            lmnReadonly$archive,
            biSchema,
        ],
    },
};

module.exports = archiveUsers;
