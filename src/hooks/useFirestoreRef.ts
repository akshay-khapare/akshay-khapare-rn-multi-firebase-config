import { firestore } from "../Firebase";

/**
 * Hook to get Firestore document reference
 */
export const useFirestoreRef = () => {
  const getFirestoreReference = (
    collection: string,
    doc: string,
    firebaseProjectName?: string
  ) => firestore(firebaseProjectName).collection(collection).doc(doc);

  return { getFirestoreReference };
};
