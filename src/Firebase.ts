import firebaseApp from "@react-native-firebase/app";
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';

export const auth = (name?: string) => firebaseApp.app(name).auth();
export const firestore = (name?: string) => firebaseApp.app(name).firestore();
export const storage = (name?: string) => firebaseApp.app(name).storage();