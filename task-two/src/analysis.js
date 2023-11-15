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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = require("fs/promises");
var email_validator_1 = require("email-validator");
function analyseFiles(inputPaths, outputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var readPromises, emailArrays, trueEmailArr_1, validEmailArr_1, validDomainsArr_1, domainNamesFreq_1, uniqueValidDomainsArr, result, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log('inputPaths:', inputPaths); // Log inputPaths for debugging
                    readPromises = inputPaths.map(function (filePath) { return __awaiter(_this, void 0, void 0, function () {
                        var data, readErr_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log('Reading file:', filePath); // Log each file being read
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, promises_1.default.readFile(filePath, 'utf-8')];
                                case 2:
                                    data = _a.sent();
                                    return [2 /*return*/, data.split('\n').slice(1, -1)];
                                case 3:
                                    readErr_1 = _a.sent();
                                    console.error("Error reading file ".concat(filePath, ":"), readErr_1);
                                    return [2 /*return*/, []];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(readPromises)];
                case 1:
                    emailArrays = _a.sent();
                    trueEmailArr_1 = [];
                    validEmailArr_1 = [];
                    validDomainsArr_1 = [];
                    domainNamesFreq_1 = {};
                    emailArrays.forEach(function (emailArr) {
                        trueEmailArr_1 = __spreadArray(__spreadArray([], trueEmailArr_1, true), emailArr, true);
                        for (var _i = 0, emailArr_1 = emailArr; _i < emailArr_1.length; _i++) {
                            var email = emailArr_1[_i];
                            if (email_validator_1.default.validate(email)) {
                                validEmailArr_1.push(email);
                                var splitValid = email.split('@');
                                validDomainsArr_1.push(splitValid[1]);
                            }
                        }
                    });
                    validDomainsArr_1.forEach(function (z) {
                        if (domainNamesFreq_1[z]) {
                            domainNamesFreq_1[z]++;
                        }
                        else {
                            domainNamesFreq_1[z] = 1;
                        }
                    });
                    uniqueValidDomainsArr = Array.from(new Set(validDomainsArr_1));
                    result = {
                        'valid-domains': uniqueValidDomainsArr,
                        totalEmailsParsed: trueEmailArr_1.length,
                        totalValidEmails: validEmailArr_1.length,
                        categories: domainNamesFreq_1,
                    };
                    console.log('Result:', result);
                    return [4 /*yield*/, promises_1.default.writeFile(outputPath, JSON.stringify(result), 'utf-8')];
                case 2:
                    _a.sent();
                    console.log('Result saved successfully.');
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error('Error:', err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// import  fs from 'fs/promises';
// import EmailValidator from 'email-validator';
// interface Results {
//   'valid-domains': string[];
//   totalEmailsParsed: number;
//   totalValidEmails: number;
//   categories: Record<string, number>;
// }
// async function analyseFiles(inputPaths: string[], outputPath: string) {
//   try {
//     console.log('inputPaths:', inputPaths); // Log inputPaths for debugging
//     const readPromises = inputPaths.map(async (filePath) => {
//       console.log('Reading file:', filePath); // Log each file being read
//       try {
//         const data = await fs.readFile(filePath, 'utf-8');
//         return data.split('\n').slice(1, -1);
//       } catch (readErr) {
//         console.error(`Error reading file ${filePath}:`, readErr);
//         return [];
//       }
//     });
//     const emailArrays = await Promise.all(readPromises);
//     let trueEmailArr: string[] = [];
//     let validEmailArr: string[] = [];
//     let validDomainsArr: string[] = [];
//     let domainNamesFreq: Record<string, number> = {};
//     emailArrays.forEach((emailArr) => {
//       trueEmailArr = [...trueEmailArr, ...emailArr];
//       for (const email of emailArr) {
//         if (EmailValidator.validate(email)) {
//           validEmailArr.push(email);
//           const splitValid = email.split('@');
//           validDomainsArr.push(splitValid[1]);
//         }
//       }
//     });
//     validDomainsArr.forEach((z) => {
//       if (domainNamesFreq[z]) {
//         domainNamesFreq[z]++;
//       } else {
//         domainNamesFreq[z] = 1;
//       }
//     });
//     const uniqueValidDomainsArr = Array.from(new Set<string>(validDomainsArr));
//     const result: Results = {
//       'valid-domains': uniqueValidDomainsArr,
//       totalEmailsParsed: trueEmailArr.length,
//       totalValidEmails: validEmailArr.length,
//       categories: domainNamesFreq,
//     };
//     console.log('Result:', result);
//     await fs.writeFile(outputPath, JSON.stringify(result), 'utf-8');
//     console.log('Result saved successfully.');
//   } catch (err) {
//     console.error('Error:', err);
//   }
// }
// export default analyseFiles;
