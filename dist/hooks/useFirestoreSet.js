"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirestoreSet = void 0;
const Firebase_1 = require("../Firebase");
const firestore_1 = require("@react-native-firebase/firestore");
/**
 * Hook for setting data in Firestore
 */
const useFirestoreSet = () => {
    const setData = async ({ collection, doc, data, firebaseProject, merge = false, addTimestamp = false, }) => {
        const documentData = addTimestamp
            ? { ...data, updatedAt: (0, firestore_1.serverTimestamp)() }
            : data;
        await (0, Firebase_1.firestore)(firebaseProject)
            .collection(collection)
            .doc(doc)
            .set(documentData, { merge });
        return doc;
    };
    return { setData };
};
exports.useFirestoreSet = useFirestoreSet;
