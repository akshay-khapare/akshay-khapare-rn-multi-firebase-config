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
export interface ProjectConfig {
    name: string;
    config: FirebaseConfig;
}
declare class MultiFirebaseManager {
    private static instance;
    private projects;
    private constructor();
    static getInstance(): MultiFirebaseManager;
    /**
     * Initialize multiple Firebase projects
     * @param projects Array of project configurations
     * @throws Error if project initialization fails
     */
    initializeProjects(projects: ProjectConfig[]): Promise<void>;
    /**
     * Initialize a single Firebase project
     * @param project Project configuration
     * @returns Firebase app instance
     * @throws Error if project initialization fails
     */
    private initializeProject;
    /**
     * Get Firebase app instance by project name
     * @param projectName Name of the project
     * @returns Firebase app instance
     * @throws Error if project is not initialized
     */
    getProject(projectName: string): firebase.FirebaseApp;
    /**
     * Get all initialized Firebase projects
     * @returns Map of project names to Firebase app instances
     */
    getAllProjects(): Map<string, firebase.FirebaseApp>;
    /**
     * Delete a Firebase project instance
     * @param projectName Name of the project to delete
     * @throws Error if project deletion fails
     */
    deleteProject(projectName: string): Promise<void>;
}
export declare const multiFirebase: MultiFirebaseManager;
export default multiFirebase;
