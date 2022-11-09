"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeUsersData = exports.fetchUsersData = exports.writeUpdatedData = exports.writeData = exports.fetchData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.fetchData = (function () {
    try {
        const data = JSON.parse(fs_1.default === null || fs_1.default === void 0 ? void 0 : fs_1.default.readFileSync(path_1.default.join(__dirname, '..', path_1.default.sep, '..', path_1.default.sep, '/database/database.json'), 'utf-8'));
        return data;
    }
    catch (error) {
        // Create database if it doesn't exist.
        fs_1.default.writeFileSync(path_1.default.join(__dirname, '..', path_1.default.sep, '..', path_1.default.sep, '/database/database.json'), JSON.stringify([]), 'utf-8');
        const dataStore = [];
        return dataStore;
    }
});
const writeData = function (result, dataStore) {
    dataStore.push(result);
    fs_1.default.writeFileSync(path_1.default.join(__dirname, '..', path_1.default.sep, '..', path_1.default.sep, '/database/database.json'), JSON.stringify(dataStore, null, 3), 'utf-8');
};
exports.writeData = writeData;
const writeUpdatedData = function (result) {
    fs_1.default.writeFileSync(path_1.default.join(__dirname, '..', path_1.default.sep, '..', path_1.default.sep, '/database/database.json'), JSON.stringify(result, null, 3), 'utf-8');
};
exports.writeUpdatedData = writeUpdatedData;
/*********************************************Users Database************************************/
exports.fetchUsersData = (function () {
    try {
        const data = JSON.parse(fs_1.default === null || fs_1.default === void 0 ? void 0 : fs_1.default.readFileSync(path_1.default.join(__dirname, '..', path_1.default.sep, '..', path_1.default.sep, '/database/usersDatabase.json'), 'utf-8'));
        return data;
    }
    catch (error) {
        // Create database if it doesn't exist.
        fs_1.default.writeFileSync(path_1.default.join(__dirname, '..', path_1.default.sep, '..', path_1.default.sep, '/database/usersDatabase.json'), JSON.stringify([]), 'utf-8');
        const dataStore = [];
        return dataStore;
    }
});
const writeUsersData = function (result, userStore) {
    userStore.push(result);
    fs_1.default.writeFileSync(path_1.default.join(__dirname, '..', path_1.default.sep, '..', path_1.default.sep, '/database/usersDatabase.json'), JSON.stringify(userStore, null, 3), 'utf-8');
};
exports.writeUsersData = writeUsersData;
//# sourceMappingURL=util.js.map