"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsDocumentExist = void 0;
const useFirestoreRef_1 = require("./useFirestoreRef");
/**
 * Hook to check if a document exists in Firestore
 * @returns Object containing isExist function for document existence check
 */
const useIsDocumentExist = () => {
    const { getFirestoreReference } = (0, useFirestoreRef_1.useFirestoreRef)();
    /**
     * Checks if a document exists in Firestore
     * @param params - Parameters to identify the document location
     * @returns Promise resolving to boolean indicating if document exists
     */
    const isExist = async ({ collection, doc, firebaseProject, }) => {
        const snapshot = await getFirestoreReference(collection, doc, firebaseProject).get();
        return snapshot.exists;
    };
    return { isExist };
};
exports.useIsDocumentExist = useIsDocumentExist;
