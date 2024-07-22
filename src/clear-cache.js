{
    Object.keys(require.cache)
        .filter((_) => RegExp(path.resolve().replaceAll("\\", "\\\\")).test(_))
        .forEach((_) => {
            delete require.cache[_];
        });
}
