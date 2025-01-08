import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
/**
 * Parameters for constructing a Firestore query
 */
interface QueryParams {
    /** Collection name to query */
    collection: string;
    /** Optional Firebase project name for multi-project setup */
    firebaseProjectName?: string;
    /** Array of where conditions: [field, operator, value] */
    where?: [string, FirebaseFirestoreTypes.WhereFilterOp, any][];
    /** Array of orderBy conditions: [field, direction] */
    orderBy?: [string, "asc" | "desc"][];
    /** Maximum number of documents to return */
    limit?: number;
    /** Start cursor value */
    startAt?: any;
    /** Start after cursor value */
    startAfter?: any;
    /** End cursor value */
    endAt?: any;
    /** End before cursor value */
    endBefore?: any;
}
/**
 * Options for query execution
 */
interface QueryOptions {
    /** Source to get data from */
    source?: "default" | "server" | "cache";
}
/**
 * Hook for executing complex Firestore queries
 * @returns Object containing getQuery function
 */
export declare const useFirestoreGetQuery: () => {
    getQuery: <T = FirebaseFirestoreTypes.DocumentData>({ collection, firebaseProjectName, where, orderBy, limit, startAt, startAfter, endAt, endBefore, }: QueryParams, options?: QueryOptions) => Promise<(T & {
        id: string;
    })[]>;
};
export {};
