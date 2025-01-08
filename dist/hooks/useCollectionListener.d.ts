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
export declare const useCollectionListener: () => {
    listenToCollection: <T extends Record<string, any>>(params: ListenerParams<T>) => (() => void);
};
export {};
