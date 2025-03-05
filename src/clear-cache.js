{
    const { log } = require("./modules/utils.cjs");
    const { loadScript, loadFolder } = require("./modules/load.cjs");

    Object.keys(require.cache)
        .filter((_) => RegExp(path.resolve().replaceAll("\\", "\\\\")).test(_))
        .forEach((_) => {
            delete require.cache[`${_}`];
        });

    /** @param { string } path */
    const load = global.load.bind(global);
    global.loadScript = (path) => loadScript(load, path);
    global.loadFolder = (path) => loadFolder(load, path);

    log("I", "CACHE", "Cache cleared");
}
