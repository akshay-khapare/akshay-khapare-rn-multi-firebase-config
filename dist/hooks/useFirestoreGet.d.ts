import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
/**
 * Hook for fetching single documents from Firestore
 * @returns Object containing getData function
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
