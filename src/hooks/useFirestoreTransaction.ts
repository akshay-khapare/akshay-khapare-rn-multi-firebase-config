import { firestore } from "../Firebase";
import { serverTimestamp } from "@react-native-firebase/firestore";
import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

/**
 * Operation types for batch processing
 */
type OperationType = "set" | "update" | "delete";

/**
 * Single operation in a batch
 * @template T - Type of the document data
 */
interface BatchOperation<T = any> {
  /** Type of operation to perform */
  type: OperationType;
  /** Collection name in Firestore */
  collection: string;
  /** Document ID */
  doc: string;
  /** Data for set/update operations */
  data?: T;
  /** Whether to merge with existing document (for set operations) */
  merge?: boolean;
  /** Add server timestamp to the document */
  addTimestamp?: boolean;
}

/**
 * Hook for handling Firestore transactions and batch operations
 * @returns Object containing transaction and batch operation functions
 */
export const useFirestoreTransaction = () => {
  /**
   * Executes multiple operations in a batch
   * @param operations - Array of batch operations to execute
   * @param firebaseProject - Optional Firebase project name
   * @returns Promise resolving to an array of document IDs
   */
  const executeBatch = async (
    operations: BatchOperation[],
    firebaseProject?: string
  ): Promise<string[]> => {
    const batch = firestore(firebaseProject).batch();

    operations.forEach(({ type, collection, doc, data, merge, addTimestamp }) => {
      const ref = firestore(firebaseProject).collection(collection).doc(doc);
      const documentData = addTimestamp ? { ...data, updatedAt: serverTimestamp() } : data;

      switch (type) {
        case "set":
          if (documentData) {
            batch.set(ref, documentData, { merge: merge ?? false });
          }
          break;
        case "update":
          if (documentData) {
            batch.update(ref, documentData);
          }
          break;
        case "delete":
          batch.delete(ref);
          break;
      }
    });

    await batch.commit();
    return operations.map((op) => op.doc);
  };

  /**
   * Executes operations in a transaction
   * @template T - Type of the transaction result
   * @param callback - Transaction callback function
   * @returns Promise resolving to transaction result
   */
  const executeTransaction = async <T>(
    callback: (
      transaction: FirebaseFirestoreTypes.Transaction,
      firestoreInstance: typeof firestore
    ) => Promise<T>
  ): Promise<T> => {
    return firestore().runTransaction(async (transaction) => {
      return callback(transaction, firestore);
    });
  };

  return {
    executeBatch,
    executeTransaction,
  };
};
