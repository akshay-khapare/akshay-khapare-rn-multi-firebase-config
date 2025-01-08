import { firestore } from "../firebase";
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
export declare const useFirestoreTransaction: () => {
    executeBatch: (operations: BatchOperation[], firebaseProject?: string) => Promise<string[]>;
    executeTransaction: <T>(callback: (transaction: FirebaseFirestoreTypes.Transaction, firestoreInstance: typeof firestore) => Promise<T>) => Promise<T>;
};
export {};
