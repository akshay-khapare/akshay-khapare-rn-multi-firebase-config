import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useFirestoreRef } from "./useFirestoreRef";

/**
 * Hook for fetching single documents from Firestore.
 * 
 * This hook provides a simple way to retrieve a document from Firestore.
 * It returns an object containing the `getData` function, which can be used to fetch a document.
 * 
 * @returns Object containing `getData` function
 */
export const useFirestoreGet = () => {
  const { getFirestoreReference } = useFirestoreRef();

  /**
   * Fetches a document from Firestore.
   * 
   * This function takes an object with `collection`, `doc`, and optional `firebaseProjectName` as parameters.
   * It returns a Promise that resolves to an object containing the document's `id`, `exists` status, and `data`.
   * 
   * @template T - Type of the document data (defaults to FirebaseFirestoreTypes.DocumentData)
   * @param params - Object containing collection, doc, and optional project name
   * @returns Promise resolving to document data and metadata
   */
  const getData = async <T = FirebaseFirestoreTypes.DocumentData>({
    collection,
    doc,
    firebaseProjectName,
  }: {
    collection: string;
    doc: string;
    firebaseProjectName?: string;
  }): Promise<{ id: string; exists: boolean; data: T | null; }> => {
    const snapshot = await getFirestoreReference(collection, doc, firebaseProjectName).get();

    return {
      id: snapshot.id,
      exists: snapshot.exists,
      data: snapshot.exists ? (snapshot.data() as T) : null,
    };
  };

  return { getData };
};
