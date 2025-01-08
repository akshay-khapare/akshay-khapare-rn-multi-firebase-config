/**
 * Parameters for updating document data in Firestore
 * @template T - Type of the document data (must be a Record with string keys)
 */
interface UpdateDataParams<T extends Record<string, any>> {
    /** Collection name in Firestore */
    collection: string;
    /** Document ID to update */
    doc: string;
    /** Partial data to update in the document */
    data: Partial<T>;
    /** Optional Firebase project name for multi-project setup */
    firebaseProject?: string;
    /** Add server timestamp to the document (default: false) */
    addTimestamp?: boolean;
}
/**
 * Hook for updating data in Firestore
 * @returns Object containing updateData function for document updates
 */
export declare const useFirestoreUpdate: () => {
    updateData: <T extends Record<string, any>>({ collection, doc, data, firebaseProject, addTimestamp, }: UpdateDataParams<T>) => Promise<string>;
};
export {};
