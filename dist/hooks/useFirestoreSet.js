"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirestoreSet = void 0;
const firebase_1 = require("../firebase");
const firestore_1 = require("@react-native-firebase/firestore");
/**
 * Hook for setting data in Firestore
 * @returns Object containing setData function
 */
const useFirestoreSet = () => {
    /**
     * Sets data in a Firestore document
     * @template T - Type of the document data
     * @param params - Parameters for setting the document data
     * @returns Promise resolving to the document ID
     */
    const setData = async ({ collection, doc, data, firebaseProject, merge = false, addTimestamp = false, }) => {
        const documentData = addTimestamp ? { ...data, updatedAt: (0, firestore_1.serverTimestamp)() } : data;
        await (0, firebase_1.firestore)(firebaseProject).collection(collection).doc(doc).set(documentData, { merge });
        return doc;
    };
    return { setData };
};
exports.useFirestoreSet = useFirestoreSet;
