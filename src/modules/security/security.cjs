const { randomUUID } = require("crypto");
const { inspect } = require("util");
const { log, indent } = require("../utils.cjs");
const { roleToString, stringToRole, privilegeToString, stringToPrivilege } = require("./security-utils.cjs");

/** @satisfies { WriteConcern } */
const WRITE_CONCERN = { w: "majority" };
/** @satisfies { import("util").InspectOptions } */
const INSPECT_OPTIONS = { breakLength: 120, colors: true };

/**
 * @param { Database } db
 * @param { RoleDefinition } roleDefinition
 */
const ensureRole = async (db, roleDefinition) => {
    const { db: dbName, role: rolename } = roleDefinition;
    const targetDB = db.getSiblingDB(dbName);
    const serverRole = await targetDB.getRole(rolename, { showPrivileges: true });

    if (!serverRole) {
        await createRole(targetDB, roleDefinition);
        log("I", "ROLE", `[${rolename}@${dbName}] created.`);
        return;
    }

    await ensureRolesOnRole(targetDB, rolename, roleDefinition.roles, serverRole.roles);
    await ensurePrivilegesOnRole(targetDB, rolename, roleDefinition.privileges, serverRole.privileges);
};

/**
 * @param { Database } db
 * @param { RoleDefinition } roleDefinition
 */
const createRole = async (db, roleDefinition) => {
    const { db: dbName, ...role } = roleDefinition;
    const targetDB = db.getSiblingDB(dbName);
    return await targetDB.createRole(role, WRITE_CONCERN);
};

/**
 * @param { Database } db
 * @param { string } rolename
 * @param { (Role | string)[] } needRoles
 * @param { (Role | string)[] } haveRoles
 */
const ensureRolesOnRole = async (db, rolename, needRoles, haveRoles) => {
    const needStrRoles = new Set(needRoles.map(roleToString));
    const haveStrRoles = new Set(haveRoles.map(roleToString));

    for (const roleStr of haveStrRoles) {
        if (needStrRoles.has(roleStr)) {
            needStrRoles.delete(roleStr);
            haveStrRoles.delete(roleStr);
        }
    }

    const revokeRoles = Array.from(haveStrRoles).map(stringToRole);
    const grantRoles = Array.from(needStrRoles).map(stringToRole);

    if (revokeRoles.length) {
        await db.revokeRolesFromRole(rolename, revokeRoles, WRITE_CONCERN);
        log("W", "ROLE", `${revokeRoles.length} roles revoked from ${rolename}@${db.getName()}`);
        for (const role of revokeRoles) {
            log("W", "  R-", `• ${indent(inspect(role, INSPECT_OPTIONS), 35)}`);
        }
    }

    if (grantRoles.length) {
        await db.grantRolesToRole(rolename, grantRoles, WRITE_CONCERN);
        log("W", "ROLE", `${grantRoles.length} roles granted to ${rolename}@${db.getName()}`);
        for (const role of grantRoles) {
            log("W", "  R+", `• ${indent(inspect(role, INSPECT_OPTIONS), 35)}`);
        }
    }
};

/**
 * @param { Database } db
 * @param { string } rolename
 * @param { Privilege[] } needPrivileges
 * @param { Privilege[] } havePrivileges
 */
const ensurePrivilegesOnRole = async (db, rolename, needPrivileges, havePrivileges) => {
    const needStrPrivileges = new Set(needPrivileges.map(privilegeToString));
    const haveStrPrivileges = new Set(havePrivileges.map(privilegeToString));

    for (const privilegeStr of haveStrPrivileges) {
        if (needStrPrivileges.has(privilegeStr)) {
            needStrPrivileges.delete(privilegeStr);
            haveStrPrivileges.delete(privilegeStr);
        }
    }

    const revokePrivileges = Array.from(haveStrPrivileges).map(stringToPrivilege);
    const grantPrivileges = Array.from(needStrPrivileges).map(stringToPrivilege);

    if (revokePrivileges.length) {
        await db.revokePrivilegesFromRole(rolename, revokePrivileges, WRITE_CONCERN);
        log("W", "ROLE", `${revokePrivileges.length} privileges revoked from ${rolename}@${db.getName()}`);
        for (const privilege of revokePrivileges) {
            log("W", "  P-", `• ${indent(inspect(privilege, INSPECT_OPTIONS), 35)}`);
        }
    }

    if (grantPrivileges.length) {
        await db.grantPrivilegesToRole(rolename, grantPrivileges, WRITE_CONCERN);
        log("W", "ROLE", `${grantPrivileges.length} privileges granted to ${rolename}@${db.getName()}`);
        for (const privilege of grantPrivileges) {
            log("W", "  P+", `• ${indent(inspect(privilege, INSPECT_OPTIONS), 35)}`);
        }
    }
};

/**
 * @param { Database } db
 * @param { UserDefinition } userDefinition
 */
const ensureUser = async (db, userDefinition) => {
    const { db: dbName, user: username } = userDefinition;
    const targetDB = db.getSiblingDB(dbName);
    const serverUser = await targetDB.getUser(username);

    if (!serverUser) {
        await createUser(targetDB, userDefinition);
        log("I", "ROLE", `[${username}@${dbName}] created.`);
        return;
    }

    await ensureRolesOnUser(targetDB, username, userDefinition.roles, serverUser.roles);
};

/**
 * @param { Database } db
 * @param { UserDefinition } userDefinition
 */
const createUser = async (db, userDefinition) => {
    const { db: dbName, user, roles, customData } = userDefinition;
    const targetDB = db.getSiblingDB(dbName);

    log("W", "USER", `[${user}@${dbName}] Create user with random password.`);
    const pwd = randomUUID();
    return await targetDB.createUser({ user, pwd, roles, customData }, WRITE_CONCERN);
};

/**
 * @param { Database } db
 * @param { string } username
 * @param { (Role | string)[] } needRoles
 * @param { (Role | string)[] } haveRoles
 */
const ensureRolesOnUser = async (db, username, needRoles, haveRoles) => {
    const needStrRoles = new Set(needRoles.map(roleToString));
    const haveStrRoles = new Set(haveRoles.map(roleToString));

    for (const roleStr of haveStrRoles) {
        if (needStrRoles.has(roleStr)) {
            needStrRoles.delete(roleStr);
            haveStrRoles.delete(roleStr);
        }
    }

    const revokeRoles = Array.from(haveStrRoles).map(stringToRole);
    const grantRoles = Array.from(needStrRoles).map(stringToRole);

    if (revokeRoles.length) {
        await db.revokeRolesFromUser(username, revokeRoles, WRITE_CONCERN);
        log("W", "USER", `${revokeRoles.length} roles revoked from ${username}@${db.getName()}`);
        for (const role of revokeRoles) {
            log("W", "  R-", `• ${indent(inspect(role, INSPECT_OPTIONS), 35)}`);
        }
    }

    if (grantRoles.length) {
        await db.grantRolesToUser(username, grantRoles, WRITE_CONCERN);
        log("W", "USER", `${grantRoles.length} roles granted to ${username}@${db.getName()}`);
        for (const role of grantRoles) {
            log("W", "  R+", `• ${indent(inspect(role, INSPECT_OPTIONS), 35)}`);
        }
    }
};

module.exports = { ensureRole, ensureUser };
