const { inspect } = require("util");

/** @param  { unknown } data */
const format = (data) => {
    if (typeof data === "object" || typeof data === "function") {
        return inspect(data, false, null, true);
    } else {
        return data;
    }
};

/** @param  { unknown[] } data */
const paint = (...data) => {
    return console.log(...data.map(format));
};

/**
 * @param  { "D" | "I" | "W" | "E" | "F" } verbose
 * @param  { string } label
 * @param  { unknown[] } data
 */
const log = (verbose, label, ...data) => {
    return paint(new Date(), ` ${verbose}`, ` ${label} `, ...data);
};

/** @param { number } ms */
const wait = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * @param { unknown } have
 * @param { unknown } need
 * @param { string } [label]
 */
const compare = (have, need, label = "") => {
    const strHave = JSON.stringify(have);
    const strNeed = JSON.stringify(need);
    if (strHave === strNeed) {
        return true;
    }
    if (label) {
        log("W", label, "Options mismatch");
        log("W", " ".repeat(label.length), `• Have: ${strHave}`);
        log("W", " ".repeat(label.length), `• Need: ${strNeed}`);
    }
    return false;
};

/** @param { BulkWriteResult } result */
const stringifyResult = (result) => {
    const { matchedCount, insertedCount, upsertedCount, modifiedCount, deletedCount } = result;
    return `#=${matchedCount} • I+${insertedCount} • U+${upsertedCount} • M=${modifiedCount} • D-${deletedCount}`;
};

module.exports = { log, wait, compare, stringifyResult };
