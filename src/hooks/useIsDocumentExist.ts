import { useFirestoreRef } from "./useFirestoreRef";

/**
 * Parameters for checking document existence
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
 * @returns Object containing isExist function
 */
export const useIsDocumentExist = () => {
  const { getFirestoreReference } = useFirestoreRef();

  /**
   * Checks if a document exists in Firestore
   * @param params - Parameters to identify the document
   * @returns Promise resolving to boolean indicating document existence
   */
  const isExist = async ({
    collection,
    doc,
    firebaseProject,
  }: DocumentExistParams): Promise<boolean> => {
    const snapshot = await getFirestoreReference(collection, doc, firebaseProject).get();
    return snapshot.exists;
  };

  return { isExist };
};
