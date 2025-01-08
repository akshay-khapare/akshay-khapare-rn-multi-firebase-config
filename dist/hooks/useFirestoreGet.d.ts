import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
/**
 * Hook for fetching single documents from Firestore.
 *
 * This hook provides a simple way to retrieve a document from Firestore.
 * It returns an object containing the `getData` function, which can be used to fetch a document.
 *
 * @returns Object containing `getData` function
 */
export declare const useFirestoreGet: () => {
    getData: <T = FirebaseFirestoreTypes.DocumentData>({ collection, doc, firebaseProjectName, }: {
        collection: string;
        doc: string;
        firebaseProjectName?: string;
    }) => Promise<{
        id: string;
        exists: boolean;
        data: T | null;
    }>;
};
