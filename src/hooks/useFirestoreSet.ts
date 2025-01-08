import { firestore } from "../Firebase";
import { serverTimestamp } from "@react-native-firebase/firestore";

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
export const useFirestoreSet = () => {
  /**
   * Sets data in a Firestore document
   * @template T - Type of the document data
   * @param params - Parameters for setting the document data
   * @returns Promise resolving to the document ID
   */
  const setData = async <T extends Record<string, any>>({
    collection,
    doc,
    data,
    firebaseProject,
    merge = false,
    addTimestamp = false,
  }: SetDataParams<T>): Promise<string> => {
    const documentData = addTimestamp
      ? { ...data, updatedAt: serverTimestamp() }
      : data;
    await firestore(firebaseProject)
      .collection(collection)
      .doc(doc)
      .set(documentData, { merge });
    return doc;
  };

  return { setData };
};
