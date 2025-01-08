import { firestore } from "../firebase";
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
export const useFirestoreGetQuery = () => {
  /**
   * Executes a Firestore query with the given parameters and options
   * @template T - Type of the document data (defaults to FirebaseFirestoreTypes.DocumentData)
   * @param params - Query parameters
   * @param options - Query options
   * @returns Promise resolving to array of documents with their IDs
   */
  const getQuery = async <T = FirebaseFirestoreTypes.DocumentData>(
    params: QueryParams,
    options?: QueryOptions
  ): Promise<(T & { id: string })[]> => {
    const { collection, firebaseProjectName, where, orderBy, limit, startAt, startAfter, endAt, endBefore } = params;

    // Initialize the query as a CollectionReference
    let query: FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> = firestore(firebaseProjectName).collection(collection);

    // Apply where clauses
    where?.forEach(([field, op, value]) => query = query.where(field, op, value));

    // Apply ordering
    orderBy?.forEach(([field, direction]) => query = query.orderBy(field, direction));

    // Apply cursors
    if (startAt) query = query.startAt(startAt);
    if (startAfter) query = query.startAfter(startAfter);
    if (endAt) query = query.endAt(endAt);
    if (endBefore) query = query.endBefore(endBefore);

    // Apply limit
    if (limit) query = query.limit(limit);

    const snapshot = await query.get({ source: options?.source || "default" });

    return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) }));
  };

  return { getQuery };
};
