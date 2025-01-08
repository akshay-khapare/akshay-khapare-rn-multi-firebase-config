"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirestoreUpdate = void 0;
const useFirestoreRef_1 = require("./useFirestoreRef");
const firestore_1 = require("@react-native-firebase/firestore");
/**
 * Hook for updating data in Firestore
 * @returns Object containing updateData function
 */
const useFirestoreUpdate = () => {
    const { getFirestoreReference } = (0, useFirestoreRef_1.useFirestoreRef)();
    /**
     * Updates a document in Firestore
     * @template T - Type of the document data
     * @param params - Parameters for updating the document
     * @returns Promise resolving to the ID of the updated document
     */
    const updateData = async ({ collection, doc, data, firebaseProject, addTimestamp = false, }) => {
        const ref = getFirestoreReference(collection, doc, firebaseProject);
        const updateData = addTimestamp
            ? {
                ...data,
                updatedAt: firestore_1.FirebaseFirestoreTypes.FieldValue.serverTimestamp(),
            }
            : data;
        await ref.update(updateData);
        return doc;
    };
    return { updateData };
};
exports.useFirestoreUpdate = useFirestoreUpdate;
