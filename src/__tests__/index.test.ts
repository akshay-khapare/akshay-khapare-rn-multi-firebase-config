import multiFirebase, { ProjectConfig } from '../index';

// Mock Firebase
jest.mock('@react-native-firebase/app', () => {
  const mockApp = {
    delete: jest.fn().mockResolvedValue(undefined)
  };
  
  return {
    __esModule: true,
    default: {
      initializeApp: jest.fn().mockResolvedValue(mockApp),
      apps: []
    }
  };
});

describe('MultiFirebaseManager', () => {
  const mockProjects: ProjectConfig[] = [
    {
      name: 'test-project',
      config: {
        apiKey: 'test-api-key',
        authDomain: 'test-auth-domain',
        projectId: 'test-project-id',
        storageBucket: 'test-storage-bucket',
        messagingSenderId: 'test-sender-id',
        appId: 'test-app-id'
      }
    }
  ];

  beforeEach(() => {
    // Clear all projects before each test
    const projects = multiFirebase.getAllProjects();
    projects.forEach((_, name) => {
      multiFirebase.deleteProject(name);
    });
  });

  it('should initialize projects successfully', async () => {
    await expect(multiFirebase.initializeProjects(mockProjects)).resolves.not.toThrow();
  });

  it('should get initialized project', async () => {
    await multiFirebase.initializeProjects(mockProjects);
    expect(() => multiFirebase.getProject('test-project')).not.toThrow();
  });

  it('should throw error when getting non-existent project', () => {
    expect(() => multiFirebase.getProject('non-existent')).toThrow();
  });

  it('should delete project successfully', async () => {
    await multiFirebase.initializeProjects(mockProjects);
    await expect(multiFirebase.deleteProject('test-project')).resolves.not.toThrow();
  });

  it('should maintain singleton instance', () => {
    const instance1 = multiFirebase;
    const instance2 = multiFirebase;
    expect(instance1).toBe(instance2);
  });
});
