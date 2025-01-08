import { useFirestoreRef } from "./useFirestoreRef";
import {
  FirebaseFirestoreTypes,
  serverTimestamp,
} from "@react-native-firebase/firestore";

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
export const useFirestoreUpdate = () => {
  const { getFirestoreReference } = useFirestoreRef();

  /**
   * Updates a document in Firestore
   * @template T - Type of the document data
   * @param params - Parameters for updating the document
   * @returns Promise resolving to the ID of the updated document
   */
  const updateData = async <T extends Record<string, any>>({
    collection,
    doc,
    data,
    firebaseProject,
    addTimestamp = false,
  }: UpdateDataParams<T>): Promise<string> => {
    const ref = getFirestoreReference(collection, doc, firebaseProject);

    const updateData = addTimestamp
      ? {
          ...data,
          updatedAt: serverTimestamp(),
        }
      : data;

    await ref.update(updateData);
    return doc;
  };

  return { updateData };
};
