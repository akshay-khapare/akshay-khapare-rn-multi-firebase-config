export {
  FirebaseConfig,
  initializeMultipleFirebaseProjects,
} from "./firebaseInit";
export { auth, firestore, storage } from "./Firebase";

// Hooks exports
export { useFirestoreSet } from "./hooks/useFirestoreSet";
export { useFirestoreGet } from "./hooks/useFirestoreGet";
export { useFirestoreGetQuery } from "./hooks/useFirestoreGetQuery";
export { useFirestoreUpdate } from "./hooks/useFirestoreUpdate";
export { useFirestoreTransaction } from "./hooks/useFirestoreTransaction";
export { useIsDocumentExist } from "./hooks/useIsDocumentExist";
export { useCollectionListener } from "./hooks/useCollectionListener";
export { useDocumentListener } from "./hooks/useDocumentListener";
