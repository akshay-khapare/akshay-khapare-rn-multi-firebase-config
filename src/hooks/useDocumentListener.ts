import { firestore } from "../Firebase";
import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

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

export const useDocumentListener = () => {
  const listenToDocument = <T extends Record<string, any>>({
    collection,
    doc,
    onData,
    onError,
    firebaseProject
  }: ListenerParams<T>): (() => void) => {
    return firestore(firebaseProject)
      .collection(collection)
      .doc(doc)
      .onSnapshot(
        (snapshot) => {
          onData({
            id: snapshot.id,
            exists: snapshot.exists,
            data: snapshot.exists ? (snapshot.data() as T) : null
          });
        },
        error => onError?.(error)
      );
  };

  return { listenToDocument };
};
