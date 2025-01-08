import { firestore } from "../firebase";
import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

/**
 * Interface representing a document's data with an ID.
 *
 * @template T The type of the document's data.
 */
interface DocumentData<T> {
  id: string;
  data: T;
}

/**
 * Interface representing the parameters for the `listenToCollection` function.
 *
 * @template T The type of the document's data.
 */
interface ListenerParams<T> {
  /**
   * The name of the collection to listen to.
   */
  collection: string;
  /**
   * The Firebase project ID (optional).
   */
  firebaseProject?: string;
  /**
   * The callback function to handle the data.
   */
  onData: (data: DocumentData<T>[]) => void;
  /**
   * The callback function to handle errors (optional).
   */
  onError?: (error: Error) => void;
  /**
   * The filter conditions for the query (optional).
   */
  where?: [string, FirebaseFirestoreTypes.WhereFilterOp, any][];
  /**
   * The order by conditions for the query (optional).
   */
  orderBy?: [string, "asc" | "desc"][];
  /**
   * The limit for the query (optional).
   */
  limit?: number;
}

/**
 * Hook to listen to a Firestore collection.
 *
 * @returns An object with the `listenToCollection` function.
 */
export const useCollectionListener = () => {
  /**
   * Function to listen to a Firestore collection.
   *
   * @template T The type of the document's data.
   * @param params The parameters for the listener.
   * @returns A function to unsubscribe from the listener.
   */
  const listenToCollection = <T extends Record<string, any>>(params: ListenerParams<T>): (() => void) => {
    const { collection, firebaseProject, onData, onError, where, orderBy, limit } = params;
    const collectionRef = firestore(firebaseProject).collection(collection);
    let query = collectionRef as FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>;

    // Build the query based on provided parameters
    if (where) {
      where.forEach(([field, op, value]) => query = query.where(field, op, value));
    }

    if (orderBy) {
      orderBy.forEach(([field, direction]) => query = query.orderBy(field, direction));
    }

    if (limit) {
      query = query.limit(limit);
    }

    return query.onSnapshot(
      (snapshot) => {
        onData(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() as T })));
      },
      (error) => onError?.(error)
    );
  };

  return { listenToCollection };
};
