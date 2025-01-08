/**
 * Parameters for updating document data
 * @template T - Type of the document data
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
    /** Optional timestamp field to update automatically */
    addTimestamp?: boolean;
}
/**
 * Hook for updating data in Firestore
 * @returns Object containing updateData function
 */
export declare const useFirestoreUpdate: () => {
    updateData: <T extends Record<string, any>>({ collection, doc, data, firebaseProject, addTimestamp, }: UpdateDataParams<T>) => Promise<string>;
};
export {};
