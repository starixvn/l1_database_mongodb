{
    const { log } = require("./modules/utils.cjs");
    Object.keys(require.cache)
        .filter((_) => RegExp(path.resolve().replaceAll("\\", "\\\\")).test(_))
        .forEach((_) => {
            delete require.cache[_];
        });
    log("D", "CACHE", "Cache cleared");
}
