import { firestore } from "../firebase";

interface DocumentData<T> {
  id: string;
  exists: boolean;
  data: T | null;
}

interface ListenerParams<T> {
  collection: string;
  doc: string;
  onData: (data: DocumentData<T>) => void;
  onError?: (error: Error) => void;
  firebaseProject?: string;
}

/**
 * Hook to listen to a Firestore document.
 *
 * @returns An object with the `listenToDocument` function.
 */
export const useDocumentListener = () => {
  /**
   * Function to listen to a Firestore document.
   *
   * @template T The type of the document's data.
   * @param params The parameters for the listener.
   * @returns A function to unsubscribe from the listener.
   */
  const listenToDocument = <T extends Record<string, any>>({
    collection,
    doc,
    onData,
    onError,
    firebaseProject,
  }: ListenerParams<T>): (() => void) => {
    return firestore(firebaseProject)
      .collection(collection)
      .doc(doc)
      .onSnapshot(
        (snapshot) => {
          onData({
            id: snapshot.id,
            exists: snapshot.exists,
            data: snapshot.exists ? (snapshot.data() as T) : null,
          });
        },
        (error) => onError?.(error)
      );
  };

  return { listenToDocument };
};
