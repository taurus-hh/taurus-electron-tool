"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = require("child_process");
var inquirer_1 = __importDefault(require("inquirer"));
var ora_1 = __importDefault(require("ora"));
var log_symbols_1 = __importDefault(require("log-symbols"));
var tdunzip_1 = require("@taraus-he/tdunzip");
var download_1 = require("./download");
function createProject(name) {
    return __awaiter(this, void 0, void 0, function () {
        var projectName, exists, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    projectName = name ? process.cwd() + '/' + name : process.cwd();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs_extra_1.default.pathExists(projectName)];
                case 2:
                    exists = _a.sent();
                    if (exists) {
                        console.log(log_symbols_1.default.error, chalk_1.default.red('The project already exists.'));
                    }
                    else {
                        inquirer_1.default
                            .prompt([
                            {
                                type: 'list',
                                message: 'Please pick a preset:',
                                name: 'preset',
                                choices: [
                                    'React Electron (react, typescript, eslint, prettier)',
                                    'Vue Electron (Vue, typescript, eslint, prettier)',
                                ],
                            },
                        ])
                            .then(function (answers) { return __awaiter(_this, void 0, void 0, function () {
                            var initSpinner, downloadResult, extractor, templateDir, ls;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        initSpinner = ora_1.default(chalk_1.default.cyan('Initializing project. This might take a while...'));
                                        initSpinner.start();
                                        return [4 /*yield*/, download_1.downloadTemplate()];
                                    case 1:
                                        downloadResult = _a.sent();
                                        if (!downloadResult.done) return [3 /*break*/, 3];
                                        extractor = new tdunzip_1.Extractor(downloadResult.path, {
                                            dir: process.cwd() + '/' + name,
                                        });
                                        return [4 /*yield*/, extractor.extract()];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        templateDir = projectName + '/' + 'react-electron-template-master';
                                        return [4 /*yield*/, fs_extra_1.default.copy(templateDir, projectName)];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, fs_extra_1.default.remove(templateDir)];
                                    case 5:
                                        _a.sent();
                                        initSpinner.text = chalk_1.default.green('🎉 The project create successfully!');
                                        initSpinner.succeed();
                                        try {
                                            process.chdir(name);
                                            console.log("\nNew directory: " + process.cwd() + "\n");
                                            ls = child_process_1.spawn('yarn', ['install']);
                                            ls.stdout.on('data', function (data) {
                                                console.log("\uD83D\uDE9A " + data.toString());
                                            });
                                            ls.stderr.on('data', function (data) {
                                                console.log("\u2693 " + data.toString());
                                            });
                                            ls.on('close', function () {
                                                console.log("\uD83D\uDC49 To get started:\n$ " + chalk_1.default.yellow("cd " + name) + "\n$ " + chalk_1.default.yellow('yarn install') + "\n$ " + chalk_1.default.yellow('yarn run dev'));
                                            });
                                        }
                                        catch (err) {
                                            console.error("\n chdir: " + err);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    process.exit();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createProject = createProject;
