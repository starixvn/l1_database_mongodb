/**
 * Common log function with timestamp
 * @param  {...unknown} data
 */
function log(...data) {
    console.log(new Date().toISOString(), ...data);
}

module.exports = { log };
