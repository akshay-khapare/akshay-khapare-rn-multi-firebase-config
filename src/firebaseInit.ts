import firebaseApp from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import "@react-native-firebase/storage";
import { firestore } from "./firebase";

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
export const initializeFirebase = async (
  projectName: string,
  config: FirebaseConfig
): Promise<void> => {
  const app = firebaseApp.apps.find((app) => app.name === projectName);
  if (!app) {
    await firebaseApp.initializeApp(config, projectName);
  }
};

/**
 * Configures Firestore settings for a specific Firebase instance
 * @param projectName - Name of the Firebase instance to configure
 * @returns Promise<void>
 */
export const configureFirestore = async (
  projectName: string
): Promise<void> => {
  await firestore(projectName).settings({
    persistence: true,
    cacheSizeBytes: firebaseApp.firestore.CACHE_SIZE_UNLIMITED,
  });
};

/**
 * Initializes multiple Firebase projects with their respective configurations
 * @param configs - Array of project configurations with name and config pairs
 * @returns Promise<void>
 */
export const initializeMultipleFirebaseProjects = async (
  configs: Array<{ name: string; config: FirebaseConfig }>
): Promise<void> => {
  await Promise.all(
    configs.map(async ({ name, config }) => {
      await initializeFirebase(name, config);
      await configureFirestore(name);
    })
  );
};
