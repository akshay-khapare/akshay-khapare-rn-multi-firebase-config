"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirestoreTransaction = void 0;
const firebase_1 = require("../firebase");
const firestore_1 = require("@react-native-firebase/firestore");
/**
 * Hook for handling Firestore transactions and batch operations
 * @returns Object containing transaction and batch operation functions
 */
const useFirestoreTransaction = () => {
    /**
     * Executes multiple operations in a batch
     * @param operations - Array of batch operations to execute
     * @param firebaseProject - Optional Firebase project name
     * @returns Promise resolving to an array of document IDs
     */
    const executeBatch = async (operations, firebaseProject) => {
        const batch = (0, firebase_1.firestore)(firebaseProject).batch();
        const firestoreInstance = (0, firebase_1.firestore)(firebaseProject);
        operations.forEach(({ type, collection, doc, data, merge, addTimestamp }) => {
            const ref = firestoreInstance.collection(collection).doc(doc);
            const documentData = addTimestamp ? { ...data, updatedAt: (0, firestore_1.serverTimestamp)() } : data;
            switch (type) {
                case "set":
                    if (documentData)
                        batch.set(ref, documentData, { merge: !!merge });
                    break;
                case "update":
                    if (documentData)
                        batch.update(ref, documentData);
                    break;
                case "delete":
                    batch.delete(ref);
                    break;
            }
        });
        await batch.commit();
        return operations.map(op => op.doc);
    };
    /**
     * Executes operations in a transaction
     * @template T - Type of the transaction result
     * @param callback - Transaction callback function
     * @returns Promise resolving to transaction result
     */
    const executeTransaction = async (callback) => {
        return (0, firebase_1.firestore)().runTransaction(transaction => callback(transaction, firebase_1.firestore));
    };
    return { executeBatch, executeTransaction };
};
exports.useFirestoreTransaction = useFirestoreTransaction;
