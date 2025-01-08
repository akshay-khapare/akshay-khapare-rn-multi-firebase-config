import { firestore } from "../Firebase";
import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

interface DocumentData<T> {
  id: string;
  data: T;
}

interface ListenerParams<T> {
  collection: string;
  firebaseProject?: string;
  onData: (data: DocumentData<T>[]) => void;
  onError?: (error: Error) => void;
  where?: [string, FirebaseFirestoreTypes.WhereFilterOp, any][];
  orderBy?: [string, "asc" | "desc"][];
  limit?: number;
}

export const useCollectionListener = () => {
  const listenToCollection = <T extends Record<string, any>>(params: ListenerParams<T>): (() => void) => {
    const { collection, firebaseProject, onData, onError, where, orderBy, limit } = params;
    const collectionRef = firestore(firebaseProject).collection(collection);
    let query = collectionRef as FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>;

    if (where?.length) {
      where.forEach(([field, op, value]) => {
        query = query.where(field, op, value);
      });
    }

    if (orderBy?.length) {
      orderBy.forEach(([field, direction]) => {
        query = query.orderBy(field, direction);
      });
    }

    if (limit) {
      query = query.limit(limit);
    }

    return query.onSnapshot(
      (snapshot) => {
        onData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data() as T,
          }))
        );
      },
      (error) => onError?.(error)
    );
  };

  return { listenToCollection };
};
