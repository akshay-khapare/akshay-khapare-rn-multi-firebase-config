"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.firestore = exports.auth = exports.initializeMultipleFirebaseProjects = void 0;
var firebaseInit_1 = require("./firebaseInit");
Object.defineProperty(exports, "initializeMultipleFirebaseProjects", { enumerable: true, get: function () { return firebaseInit_1.initializeMultipleFirebaseProjects; } });
var Firebase_1 = require("./Firebase");
Object.defineProperty(exports, "auth", { enumerable: true, get: function () { return Firebase_1.auth; } });
Object.defineProperty(exports, "firestore", { enumerable: true, get: function () { return Firebase_1.firestore; } });
Object.defineProperty(exports, "storage", { enumerable: true, get: function () { return Firebase_1.storage; } });
