"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirestoreRef = void 0;
const Firebase_1 = require("../Firebase");
/**
 * Hook to get Firestore document reference
 */
const useFirestoreRef = () => {
    const getFirestoreReference = (collection, doc, firebaseProjectName) => (0, Firebase_1.firestore)(firebaseProjectName).collection(collection).doc(doc);
    return { getFirestoreReference };
};
exports.useFirestoreRef = useFirestoreRef;
