"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiFirebase = void 0;
const app_1 = __importDefault(require("@react-native-firebase/app"));
class MultiFirebaseManager {
    constructor() {
        this.projects = new Map();
    }
    static getInstance() {
        if (!MultiFirebaseManager.instance) {
            MultiFirebaseManager.instance = new MultiFirebaseManager();
        }
        return MultiFirebaseManager.instance;
    }
    /**
     * Initialize multiple Firebase projects
     * @param projects Array of project configurations
     * @throws Error if project initialization fails
     */
    async initializeProjects(projects) {
        try {
            for (const project of projects) {
                if (!this.projects.has(project.name)) {
                    const app = await this.initializeProject(project);
                    this.projects.set(project.name, app);
                }
            }
        }
        catch (error) {
            throw new Error(`Failed to initialize Firebase projects: ${error}`);
        }
    }
    /**
     * Initialize a single Firebase project
     * @param project Project configuration
     * @returns Firebase app instance
     * @throws Error if project initialization fails
     */
    async initializeProject(project) {
        try {
            const existingApp = app_1.default.apps.find(app => app.name === project.name);
            if (existingApp) {
                return existingApp;
            }
            return await app_1.default.initializeApp(project.config, project.name);
        }
        catch (error) {
            throw new Error(`Failed to initialize Firebase project ${project.name}: ${error}`);
        }
    }
    /**
     * Get Firebase app instance by project name
     * @param projectName Name of the project
     * @returns Firebase app instance
     * @throws Error if project is not initialized
     */
    getProject(projectName) {
        const app = this.projects.get(projectName);
        if (!app) {
            throw new Error(`Firebase project ${projectName} is not initialized`);
        }
        return app;
    }
    /**
     * Get all initialized Firebase projects
     * @returns Map of project names to Firebase app instances
     */
    getAllProjects() {
        return new Map(this.projects);
    }
    /**
     * Delete a Firebase project instance
     * @param projectName Name of the project to delete
     * @throws Error if project deletion fails
     */
    async deleteProject(projectName) {
        try {
            const app = this.projects.get(projectName);
            if (app) {
                await app.delete();
                this.projects.delete(projectName);
            }
        }
        catch (error) {
            throw new Error(`Failed to delete Firebase project ${projectName}: ${error}`);
        }
    }
}
exports.multiFirebase = MultiFirebaseManager.getInstance();
exports.default = exports.multiFirebase;
