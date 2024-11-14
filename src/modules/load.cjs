/* eslint-disable security/detect-non-literal-fs-filename */
const { readdirSync } = require("fs");
const { basename, resolve, join, dirname } = require("path");
const process = require("process");
const { inspect } = require("util");

const { log } = require("./utils.cjs");

/** @param { Dirent } item */
const isFile = (item) => item.isFile();

/** @param { Dirent } item */
const isDirectory = (item) => item.isDirectory();

/** @param { Dirent } item */
const toFullPath = (item) => resolve(join(item.parentPath, item.name));

/** @param { string } path */
const listChildFiles = (path) => {
    return readdirSync(path, { withFileTypes: true }).filter(isFile).map(toFullPath);
};

/** @param { string } path */
const listChildDirectories = (path) => {
    return readdirSync(path, { withFileTypes: true }).filter(isDirectory).map(toFullPath);
};

/**
 * @param { typeof load } load
 * @param { string } path
 * @returns { Promise<true> }
 */
const loadScript = async (load, path, isRetry = false) => {
    const title = process.title;
    const cwd = process.cwd();
    path = resolve(path);

    try {
        process.title = `${basename(dirname(dirname(path)))}/${basename(dirname(path))}/${basename(path)}`;
        process.chdir(dirname(path));
        await load(path);
    } catch (e) {
        if (!isRetry) {
            log("W", "SCRIPT", `Error while loading script [${basename(path)}]. Retrying...`);
            await loadScript(load, path, true);
        } else {
            log("E", "SCRIPT", `Error while loading script [${basename(path)}].\n${inspect(e, false, null, true)}`);
        }
    } finally {
        process.chdir(cwd);
        process.title = title;
    }
    return true;
};

/**
 * @param { typeof load } load
 * @param { string } path
 * @returns { Promise<true> }
 */
const loadFolder = async (load, path) => {
    try {
        for (const dirPath of listChildDirectories(path)) {
            await loadFolder(load, dirPath);
        }
        for (const filePath of listChildFiles(path)) {
            await loadScript(load, filePath);
        }
    } catch (e) {
        log("E", "FOLDER", `Error while loading folder [${basename(path)}].\n${inspect(e, false, null, true)}`);
    }
    return true;
};

module.exports = { loadScript, loadFolder };
