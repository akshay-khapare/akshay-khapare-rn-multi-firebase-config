"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDocumentListener = void 0;
const Firebase_1 = require("../Firebase");
const useDocumentListener = () => {
    const listenToDocument = ({ collection, doc, onData, onError, firebaseProject }) => {
        return (0, Firebase_1.firestore)(firebaseProject)
            .collection(collection)
            .doc(doc)
            .onSnapshot((snapshot) => {
            onData({
                id: snapshot.id,
                exists: snapshot.exists,
                data: snapshot.exists ? snapshot.data() : null
            });
        }, error => onError === null || onError === void 0 ? void 0 : onError(error));
    };
    return { listenToDocument };
};
exports.useDocumentListener = useDocumentListener;
