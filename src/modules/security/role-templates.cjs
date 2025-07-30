// @ts-check
const { db$readWrite, db$read } = require("./role-builtin.cjs");

/** @satisfies { Record<string, (s: string) => RoleDefinition> } */
const roleTemplates = /** @type {const} */ ({
    operatorArchive$active: /** @template {string} T @param {T} operator */ (operator) => {
        return /** @type {const} */ ({
            role: `${operator}Archive$active`,
            db: "admin",
            roles: [
                db$readWrite(`${operator}_log`), //
                db$readWrite(`${operator}_member`),
                db$readWrite(`${operator}_minigame`),
                db$readWrite(`${operator}_minigame_rm`),
                db$read(`${operator}_ops_configs`),
                db$readWrite(`${operator}_summary`),
            ],
            privileges: [],
        });
    },
    operatorBackend$active: /** @template {string} T @param {T} operator */ (operator) => {
        return /** @type {const} */ ({
            role: `${operator}Backend$active`,
            db: "admin",
            roles: [
                db$readWrite(`${operator}_log`), //
                db$readWrite(`${operator}_member`),
                db$readWrite(`${operator}_minigame`),
                db$readWrite(`${operator}_minigame_rm`),
                db$readWrite(`${operator}_ops_configs`),
                db$read(`${operator}_summary`),
            ],
            privileges: [],
        });
    },
    operatorReadonly$active: /** @template {string} T @param {T} operator */ (operator) => {
        return /** @type {const} */ ({
            role: `${operator}Readonly$active`,
            db: "admin",
            roles: [
                db$read(`${operator}_log`), //
                db$read(`${operator}_member`),
                db$read(`${operator}_minigame`),
                db$read(`${operator}_minigame_rm`),
                db$read(`${operator}_ops_configs`),
                db$read(`Proteus`),
                db$read(`${operator}_summary`),
            ],
            privileges: [],
        });
    },
    operatorSummary$active: /** @template {string} T @param {T} operator */ (operator) => {
        return /** @type {const} */ ({
            role: `${operator}Summary$active`,
            db: "admin",
            roles: [
                db$readWrite(`${operator}_log`), //
                db$readWrite(`${operator}_minigame`),
                db$read(`${operator}_ops_configs`),
                db$readWrite(`Proteus`),
                db$readWrite(`${operator}_summary`),
            ],
            privileges: [],
        });
    },

    operatorArchive$archive: /** @template {string} T @param {T} operator */ (operator) => {
        return /** @type {const} */ ({
            role: `${operator}Archive$archive`,
            db: "admin",
            roles: [
                db$readWrite(`${operator}_log_arc`), //
                db$readWrite(`${operator}_member_arc`),
                db$readWrite(`${operator}_minigame_arc`),
                db$readWrite(`${operator}_minigame_rm`),
                db$read(`${operator}_ops_configs`),
                db$readWrite(`${operator}_summary_arc`),
            ],
            privileges: [],
        });
    },
    operatorBackend$archive: /** @template {string} T @param {T} operator */ (operator) => {
        return /** @type {const} */ ({
            role: `${operator}Backend$archive`,
            db: "admin",
            roles: [
                db$read(`${operator}_log_arc`), //
                db$read(`${operator}_member_arc`),
                db$read(`${operator}_minigame_arc`),
                db$read(`${operator}_minigame_rm`),
                db$read(`${operator}_ops_configs`),
                db$read(`${operator}_summary_arc`),
            ],
            privileges: [],
        });
    },
    operatorReadonly$archive: /** @template {string} T @param {T} operator */ (operator) => {
        return /** @type {const} */ ({
            role: `${operator}Readonly$archive`,
            db: "admin",
            roles: [
                db$read(`${operator}_log_arc`), //
                db$read(`${operator}_member_arc`),
                db$read(`${operator}_minigame_arc`),
                db$read(`${operator}_minigame_rm`),
                db$read(`${operator}_ops_configs`),
                db$read(`Proteus`),
                db$read(`${operator}_summary_arc`),
            ],
            privileges: [],
        });
    },
    operatorSummary$archive: /** @template {string} T @param {T} operator */ (operator) => {
        return /** @type {const} */ ({
            role: `${operator}Summary$archive`,
            db: "admin",
            roles: [
                db$readWrite(`${operator}_log_arc`), //
                db$readWrite(`${operator}_minigame_arc`),
                db$read(`${operator}_ops_configs`),
                db$readWrite(`Proteus`),
                db$readWrite(`${operator}_summary_arc`),
            ],
            privileges: [],
        });
    },
});

module.exports = roleTemplates;
