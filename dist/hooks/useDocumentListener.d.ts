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
export declare const useDocumentListener: () => {
    listenToDocument: <T extends Record<string, any>>({ collection, doc, onData, onError, firebaseProject, }: ListenerParams<T>) => (() => void);
};
export {};
