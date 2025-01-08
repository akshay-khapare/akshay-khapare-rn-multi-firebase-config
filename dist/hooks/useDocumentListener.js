"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDocumentListener = void 0;
const firebase_1 = require("../firebase");
/**
 * Hook to listen to a Firestore document.
 *
 * @returns An object with the `listenToDocument` function.
 */
const useDocumentListener = () => {
    /**
     * Function to listen to a Firestore document.
     *
     * @template T The type of the document's data.
     * @param params The parameters for the listener.
     * @returns A function to unsubscribe from the listener.
     */
    const listenToDocument = ({ collection, doc, onData, onError, firebaseProject, }) => {
        return (0, firebase_1.firestore)(firebaseProject)
            .collection(collection)
            .doc(doc)
            .onSnapshot((snapshot) => {
            onData({
                id: snapshot.id,
                exists: snapshot.exists,
                data: snapshot.exists ? snapshot.data() : null,
            });
        }, (error) => onError === null || onError === void 0 ? void 0 : onError(error));
    };
    return { listenToDocument };
};
exports.useDocumentListener = useDocumentListener;
