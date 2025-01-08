"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirestoreGetQuery = void 0;
const Firebase_1 = require("../Firebase");
/**
 * Hook for executing complex Firestore queries
 * @returns Object containing getQuery function
 */
const useFirestoreGetQuery = () => {
    /**
     * Executes a Firestore query with the given parameters and options
     * @template T - Type of the document data (defaults to FirebaseFirestoreTypes.DocumentData)
     * @param params - Query parameters
     * @param options - Query options
     * @returns Promise resolving to array of documents with their IDs
     */
    const getQuery = async (params, options) => {
        const { collection, firebaseProjectName, where, orderBy, limit, startAt, startAfter, endAt, endBefore, } = params;
        // Initialize the query as a CollectionReference
        let query = (0, Firebase_1.firestore)(firebaseProjectName).collection(collection);
        // Apply where clauses
        where === null || where === void 0 ? void 0 : where.forEach(([field, op, value]) => (query = query.where(field, op, value)));
        // Apply ordering
        orderBy === null || orderBy === void 0 ? void 0 : orderBy.forEach(([field, direction]) => (query = query.orderBy(field, direction)));
        // Apply cursors
        if (startAt)
            query = query.startAt(startAt);
        if (startAfter)
            query = query.startAfter(startAfter);
        if (endAt)
            query = query.endAt(endAt);
        if (endBefore)
            query = query.endBefore(endBefore);
        // Apply limit
        if (limit)
            query = query.limit(limit);
        const snapshot = await query.get({ source: (options === null || options === void 0 ? void 0 : options.source) || "default" });
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };
    return { getQuery };
};
exports.useFirestoreGetQuery = useFirestoreGetQuery;
