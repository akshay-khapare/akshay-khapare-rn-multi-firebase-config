import { firestore } from "../Firebase";
import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { serverTimestamp } from "@react-native-firebase/firestore";

/**
 * Parameters for setting document data
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
  /** Whether to merge with existing document */
  merge?: boolean;
  /** Add server timestamp to the document */
  addTimestamp?: boolean;
}

/**
 * Hook for setting data in Firestore
 */
export const useFirestoreSet = () => {
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
