"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirestoreUpdate = void 0;
const useFirestoreRef_1 = require("./useFirestoreRef");
const firestore_1 = require("@react-native-firebase/firestore");
/**
 * Hook for updating data in Firestore
 * @returns Object containing updateData function for document updates
 */
const useFirestoreUpdate = () => {
    const { getFirestoreReference } = (0, useFirestoreRef_1.useFirestoreRef)();
    /**
     * Updates a document in Firestore
     * @template T - Type of the document data
     * @param params - Parameters for updating the document
     * @returns Promise resolving to the document ID
     */
    const updateData = async ({ collection, doc, data, firebaseProject, addTimestamp = false, }) => {
        const documentData = addTimestamp ? { ...data, updatedAt: (0, firestore_1.serverTimestamp)() } : data;
        await getFirestoreReference(collection, doc, firebaseProject).update(documentData);
        return doc;
    };
    return { updateData };
};
exports.useFirestoreUpdate = useFirestoreUpdate;
