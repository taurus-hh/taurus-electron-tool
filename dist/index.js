"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var update_1 = require("./update");
var download_1 = require("./download");
var create_1 = require("./create");
var pkg = require("../package.json");
commander_1.default.version(pkg.version, '-v, --version');
commander_1.default
    .command('upgrade')
    .description("Check the taurus version.")
    .action(function () {
    update_1.update();
});
commander_1.default
    .command('template')
    .description("Download the template.")
    .action(function () {
    download_1.downloadTemplate();
});
commander_1.default
    .usage('<commands> [options]')
    .command('init <project_name>')
    .description("Create project")
    .action(function (name) {
    create_1.createProject(name);
});
commander_1.default.parse(process.argv);
