/**
 * Parameters for checking document existence in Firestore
 */
interface DocumentExistParams {
    /** Collection name in Firestore */
    collection: string;
    /** Document ID to check */
    doc: string;
    /** Optional Firebase project name for multi-project setup */
    firebaseProject?: string;
}
/**
 * Hook to check if a document exists in Firestore
 * @returns Object containing isExist function for document existence check
 */
export declare const useIsDocumentExist: () => {
    isExist: ({ collection, doc, firebaseProject, }: DocumentExistParams) => Promise<boolean>;
};
export {};
