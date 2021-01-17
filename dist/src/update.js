"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
var update_notifier_1 = __importDefault(require("update-notifier"));
var chalk_1 = __importDefault(require("chalk"));
var package_json_1 = __importDefault(require("../package.json"));
var notifier = update_notifier_1.default({
    pkg: package_json_1.default,
    updateCheckInterval: 1000 * 60 * 60 * 24 // 1 day
});
function update() {
    if (notifier.update) {
        console.log("New version available: " + chalk_1.default.cyan(notifier.update.latest) + ", it's recommended that you update before using.");
    }
    else {
        console.log('No new version is available.');
    }
}
exports.update = update;
