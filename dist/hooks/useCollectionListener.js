"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCollectionListener = void 0;
const Firebase_1 = require("../Firebase");
const useCollectionListener = () => {
    const listenToCollection = (params) => {
        const { collection, firebaseProject, onData, onError, where, orderBy, limit } = params;
        const collectionRef = (0, Firebase_1.firestore)(firebaseProject).collection(collection);
        let query = collectionRef;
        if (where === null || where === void 0 ? void 0 : where.length) {
            where.forEach(([field, op, value]) => {
                query = query.where(field, op, value);
            });
        }
        if (orderBy === null || orderBy === void 0 ? void 0 : orderBy.length) {
            orderBy.forEach(([field, direction]) => {
                query = query.orderBy(field, direction);
            });
        }
        if (limit) {
            query = query.limit(limit);
        }
        return query.onSnapshot((snapshot) => {
            onData(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })));
        }, (error) => onError === null || onError === void 0 ? void 0 : onError(error));
    };
    return { listenToCollection };
};
exports.useCollectionListener = useCollectionListener;
