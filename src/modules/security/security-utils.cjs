/** @param { (Role | string) } roleObj */
const roleToString = (roleObj) => {
    if (typeof roleObj === "string") {
        return JSON.stringify(roleObj);
    }
    const { db, role } = roleObj;
    return JSON.stringify({ db, role });
};

/** @param { string } roleStr */
const stringToRole = (roleStr) => {
    return /** @type { (Role | string) } */ (JSON.parse(roleStr));
};

/** @param { Privilege } privilegeObj */
const privilegeToString = (privilegeObj) => {
    const { resource, actions } = privilegeObj;
    return JSON.stringify({ resource, actions: actions.sort() });
};

/** @param { string } privilegeStr */
const stringToPrivilege = (privilegeStr) => {
    return /** @type { Privilege } */ (JSON.parse(privilegeStr));
};

module.exports = { roleToString, stringToRole, privilegeToString, stringToPrivilege };
