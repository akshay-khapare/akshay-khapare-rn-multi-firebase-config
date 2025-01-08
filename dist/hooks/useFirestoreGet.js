"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirestoreGet = void 0;
const useFirestoreRef_1 = require("./useFirestoreRef");
/**
 * Hook for fetching single documents from Firestore
 * @returns Object containing getData function
 */
const useFirestoreGet = () => {
    const { getFirestoreReference } = (0, useFirestoreRef_1.useFirestoreRef)();
    /**
     * Fetches a document from Firestore
     * @template T - Type of the document data (defaults to FirebaseFirestoreTypes.DocumentData)
     * @param params - Object containing collection, doc, and optional project name
     * @returns Promise resolving to document data and metadata
     */
    const getData = async ({ collection, doc, firebaseProjectName, }) => {
        const snapshot = await getFirestoreReference(collection, doc, firebaseProjectName).get();
        return {
            id: snapshot.id,
            exists: snapshot.exists,
            data: snapshot.exists ? snapshot.data() : null,
        };
    };
    return { getData };
};
exports.useFirestoreGet = useFirestoreGet;
