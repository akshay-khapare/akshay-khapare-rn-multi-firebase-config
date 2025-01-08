"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCollectionListener = void 0;
const firebase_1 = require("../firebase");
/**
 * Hook to listen to a Firestore collection.
 *
 * @returns An object with the `listenToCollection` function.
 */
const useCollectionListener = () => {
    /**
     * Function to listen to a Firestore collection.
     *
     * @template T The type of the document's data.
     * @param params The parameters for the listener.
     * @returns A function to unsubscribe from the listener.
     */
    const listenToCollection = (params) => {
        const { collection, firebaseProject, onData, onError, where, orderBy, limit } = params;
        const collectionRef = (0, firebase_1.firestore)(firebaseProject).collection(collection);
        let query = collectionRef;
        // Build the query based on provided parameters
        if (where) {
            where.forEach(([field, op, value]) => query = query.where(field, op, value));
        }
        if (orderBy) {
            orderBy.forEach(([field, direction]) => query = query.orderBy(field, direction));
        }
        if (limit) {
            query = query.limit(limit);
        }
        return query.onSnapshot((snapshot) => {
            onData(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
        }, (error) => onError === null || onError === void 0 ? void 0 : onError(error));
    };
    return { listenToCollection };
};
exports.useCollectionListener = useCollectionListener;
