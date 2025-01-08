"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirestoreRef = void 0;
const firebase_1 = require("../firebase");
/**
 * Hook to get Firestore document reference
 */
const useFirestoreRef = () => {
    const getFirestoreReference = (collection, doc, firebaseProjectName) => (0, firebase_1.firestore)(firebaseProjectName).collection(collection).doc(doc);
    return { getFirestoreReference };
};
exports.useFirestoreRef = useFirestoreRef;
