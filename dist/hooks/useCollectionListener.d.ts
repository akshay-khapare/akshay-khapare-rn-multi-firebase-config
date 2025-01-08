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
export declare const useCollectionListener: () => {
    listenToCollection: <T extends Record<string, any>>(params: ListenerParams<T>) => (() => void);
};
export {};
