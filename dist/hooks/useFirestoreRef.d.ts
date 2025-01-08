/**
 * Hook to get Firestore document reference
 */
export declare const useFirestoreRef: () => {
    getFirestoreReference: (collection: string, doc: string, firebaseProjectName?: string) => import("@react-native-firebase/firestore").FirebaseFirestoreTypes.DocumentReference<import("@react-native-firebase/firestore").FirebaseFirestoreTypes.DocumentData>;
};
