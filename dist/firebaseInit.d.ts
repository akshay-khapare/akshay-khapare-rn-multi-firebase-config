import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import "@react-native-firebase/storage";
/**
 * Firebase configuration interface
 * Contains all required and optional configuration parameters for Firebase initialization
 */
export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    databaseURL?: string;
    measurementId?: string;
}
/**
 * Initializes a Firebase instance with the provided configuration
 * @param projectName - Unique identifier for the Firebase instance
 * @param config - Firebase configuration object
 * @returns Promise<void>
 */
export declare const initializeFirebase: (projectName: string, config: FirebaseConfig) => Promise<void>;
/**
 * Configures Firestore settings for a specific Firebase instance
 * @param projectName - Name of the Firebase instance to configure
 * @returns Promise<void>
 */
export declare const configureFirestore: (projectName?: string) => Promise<void>;
/**
 * Initializes multiple Firebase projects with their respective configurations
 * @param configs - Array of project configurations with name and config pairs
 * @returns Promise<void>
 */
export declare const initializeMultipleFirebaseProjects: (configs: Array<{
    name: string;
    config: FirebaseConfig;
}>) => Promise<void>;
