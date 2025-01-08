"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.firestore = exports.auth = void 0;
const app_1 = __importDefault(require("@react-native-firebase/app"));
require("@react-native-firebase/auth");
require("@react-native-firebase/firestore");
require("@react-native-firebase/storage");
const auth = (name) => app_1.default.app(name).auth();
exports.auth = auth;
const firestore = (name) => app_1.default.app(name).firestore();
exports.firestore = firestore;
const storage = (name) => app_1.default.app(name).storage();
exports.storage = storage;
