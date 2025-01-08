"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeMultipleFirebaseProjects = exports.configureFirestore = exports.initializeFirebase = void 0;
const app_1 = __importDefault(require("@react-native-firebase/app"));
require("@react-native-firebase/auth");
require("@react-native-firebase/firestore");
require("@react-native-firebase/storage");
const Firebase_1 = require("./Firebase");
/**
 * Initializes a Firebase instance with the provided configuration
 * @param projectName - Unique identifier for the Firebase instance
 * @param config - Firebase configuration object
 * @returns Promise<void>
 */
const initializeFirebase = async (projectName, config) => {
    const app = app_1.default.apps.find((app) => app.name === projectName);
    if (!app) {
        await app_1.default.initializeApp(config, projectName);
    }
};
exports.initializeFirebase = initializeFirebase;
/**
 * Configures Firestore settings for a specific Firebase instance
 * @param projectName - Name of the Firebase instance to configure
 * @returns Promise<void>
 */
const configureFirestore = async (projectName) => {
    await (0, Firebase_1.firestore)(projectName).settings({
        persistence: true,
        cacheSizeBytes: app_1.default.firestore.CACHE_SIZE_UNLIMITED,
    });
};
exports.configureFirestore = configureFirestore;
/**
 * Initializes multiple Firebase projects with their respective configurations
 * @param configs - Array of project configurations with name and config pairs
 * @returns Promise<void>
 */
const initializeMultipleFirebaseProjects = async (configs) => {
    await Promise.all(configs.map(async ({ name, config }) => {
        await (0, exports.initializeFirebase)(name, config);
        await (0, exports.configureFirestore)(name);
    }));
};
exports.initializeMultipleFirebaseProjects = initializeMultipleFirebaseProjects;
