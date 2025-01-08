/**
 * Parameters for setting document data in Firestore
 * @template T - Type of the document data (must be a Record with string keys)
 */
interface SetDataParams<T extends Record<string, any>> {
    /** Collection name in Firestore */
    collection: string;
    /** Document ID */
    doc: string;
    /** Data to set in the document */
    data: T;
    /** Optional Firebase project name for multi-project setup */
    firebaseProject?: string;
    /** Whether to merge with existing document (default: false) */
    merge?: boolean;
    /** Add server timestamp to the document (default: false) */
    addTimestamp?: boolean;
}
/**
 * Hook for setting data in Firestore
 * @returns Object containing setData function
 */
export declare const useFirestoreSet: () => {
    setData: <T extends Record<string, any>>({ collection, doc, data, firebaseProject, merge, addTimestamp, }: SetDataParams<T>) => Promise<string>;
};
export {};
