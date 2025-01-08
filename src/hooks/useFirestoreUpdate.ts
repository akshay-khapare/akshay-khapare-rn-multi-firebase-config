import { useFirestoreRef } from "./useFirestoreRef";
import { serverTimestamp } from "@react-native-firebase/firestore";

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
export const useFirestoreUpdate = () => {
  const { getFirestoreReference } = useFirestoreRef();

  /**
   * Updates a document in Firestore
   * @template T - Type of the document data
   * @param params - Parameters for updating the document
   * @returns Promise resolving to the document ID
   */
  const updateData = async <T extends Record<string, any>>({
    collection,
    doc,
    data,
    firebaseProject,
    addTimestamp = false,
  }: UpdateDataParams<T>): Promise<string> => {
    const documentData = addTimestamp ? { ...data, updatedAt: serverTimestamp() } : data;
    await getFirestoreReference(collection, doc, firebaseProject).update(documentData);
    return doc;
  };

  return { updateData };
};
