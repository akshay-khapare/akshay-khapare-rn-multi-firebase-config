# @akshay-khapare/rn-multi-firebase-config

A utility package for managing multiple Firebase projects within a single React Native application.

## Installation

```bash
npm install @akshay-khapare/rn-multi-firebase-config
# or
yarn add @akshay-khapare/rn-multi-firebase-config
```

## Prerequisites

Make sure you have the following packages installed in your React Native project:

```bash
npm install @react-native-firebase/app @react-native-firebase/firestore @react-native-firebase/auth @react-native-firebase/storage
```

## Firebase Initialization

<details>
<summary><strong>Basic Firebase Initialization</strong></summary>

Initialize a single Firebase instance with custom configuration:

```typescript
import { initializeFirebase, FirebaseConfig } from '@akshay-khapare/rn-multi-firebase-config';

const config: FirebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
  // Optional configurations
  databaseURL: 'your-database-url',
  measurementId: 'your-measurement-id'
};

// Initialize Firebase with a project name
await initializeFirebase('my-project', config);

// Configure Firestore settings
await configureFirestore('my-project');
```
</details>

<details>
<summary><strong>Multiple Firebase Projects</strong></summary>

Initialize multiple Firebase projects simultaneously:

```typescript
import { initializeMultipleFirebaseProjects } from '@akshay-khapare/rn-multi-firebase-config';

const projectConfigs = [
  {
    name: 'project1',
    config: {
      apiKey: 'project1-api-key',
      // ... other config properties
    }
  },
  {
    name: 'project2',
    config: {
      apiKey: 'project2-api-key',
      // ... other config properties
    }
  }
];

// Initialize all projects at once
await initializeMultipleFirebaseProjects(projectConfigs);
```

Each project will be initialized with its own configuration and Firestore settings.
</details>

<details>
<summary><strong>Error Handling</strong></summary>

Example of handling initialization errors in your application:

```typescript
async function initializeFirebaseProjects() {
  try {
    await initializeMultipleFirebaseProjects([
      {
        name: 'production',
        config: productionConfig
      },
      {
        name: 'development',
        config: developmentConfig
      }
    ]);
    console.log('Firebase projects initialized successfully');
  } catch (error) {
    // Handle specific error cases
    if (error.code === 'app/duplicate-app') {
      console.error('Firebase project already exists');
    } else if (error.code === 'app/invalid-credential') {
      console.error('Invalid Firebase credentials');
    } else {
      console.error('Firebase initialization failed:', error);
    }
    
    // Rethrow or handle error based on your application needs
    throw error;
  }
}
```
</details>

<details>
<summary><strong>Best Practices</strong></summary>

1. **Project Naming**:
   - Use consistent naming conventions for projects
   - Avoid special characters in project names
   - Consider using environment-based names (e.g., 'prod', 'dev', 'staging')

2. **Configuration Management**:
   - Store Firebase configurations securely
   - Use environment variables for sensitive data
   - Never commit API keys to version control

3. **Initialization Timing**:
   - Initialize Firebase as early as possible in your app lifecycle
   - Ensure initialization is complete before using Firebase services
   - Consider using a loading screen during initialization

4. **Error Recovery**:
   - Implement retry logic for transient failures
   - Have fallback configurations where appropriate
   - Log initialization failures for debugging
</details>

## Hooks Use Cases

<details>
<summary><strong>useFirestoreSet</strong></summary>

### Basic Document Creation
```typescript
const { setData } = useFirestoreSet();

try {
  const docId = await setData({
    collection: 'users',
    doc: 'user123',
    data: userData,
    addTimestamp: true
  });
  console.log(`Document created: ${docId}`);
} catch (error) {
  console.error('Error creating document:', error);
}
```

### Merge Update with Error Handling
```typescript
const { setData } = useFirestoreSet();

try {
  await setData({
    collection: 'users',
    doc: userId,
    data: partialData,
    merge: true,
    addTimestamp: true
  });
} catch (error) {
  if (error.code === 'permission-denied') {
    console.error('Permission denied to update document');
  } else if (error.code === 'not-found') {
    console.error('Document not found');
  } else {
    console.error('Error updating document:', error);
  }
}
```
</details>

<details>
<summary><strong>useFirestoreGet</strong></summary>

### Basic Document Fetch
```typescript
const { getData } = useFirestoreGet();

try {
  const result = await getData<UserProfile>({
    collection: 'users',
    doc: userId
  });
  
  if (result.exists) {
    console.log(`User data:`, result.data);
  } else {
    console.log(`User ${userId} not found`);
  }
} catch (error) {
  console.error('Error fetching user:', error);
}
```

### Multi-Project Fetch with Error Handling
```typescript
const { getData } = useFirestoreGet();

try {
  const [mainData, backupData] = await Promise.all([
    getData({
      collection: 'users',
      doc: userId,
      firebaseProjectName: 'main-project'
    }),
    getData({
      collection: 'users',
      doc: userId,
      firebaseProjectName: 'backup-project'
    })
  ]);
  
  if (!mainData.exists && !backupData.exists) {
    throw new Error('Document not found in any project');
  }
} catch (error) {
  if (error.code === 'unavailable') {
    console.error('Firebase service is currently unavailable');
  } else {
    console.error('Error in cross-project fetch:', error);
  }
}
```
</details>

<details>
<summary><strong>useFirestoreGetQuery</strong></summary>

### Basic Query with Error Handling
```typescript
const { getQuery } = useFirestoreGetQuery();

try {
  const results = await getQuery<Product>({
    collection: 'products',
    where: [['category', '==', 'electronics']],
    orderBy: [['price', 'asc']],
    limit: 10
  });
  console.log(`Found ${results.length} products`);
} catch (error) {
  if (error.code === 'failed-precondition') {
    console.error('Query requires an index');
  } else {
    console.error('Query failed:', error);
  }
}
```

### Advanced Query with Pagination
```typescript
const { getQuery } = useFirestoreGetQuery();

try {
  const results = await getQuery({
    collection: 'products',
    where: [
      ['price', '>=', 100],
      ['stock', '>', 0]
    ],
    orderBy: [['createdAt', 'desc']],
    limit: 20,
    startAfter: lastDocument
  });
} catch (error) {
  if (error.code === 'resource-exhausted') {
    console.error('Query quota exceeded');
  } else {
    console.error('Advanced query failed:', error);
  }
}
```
</details>

<details>
<summary><strong>useFirestoreUpdate</strong></summary>

### Basic Update with Error Handling
```typescript
const { updateData } = useFirestoreUpdate();

try {
  const docId = await updateData({
    collection: 'users',
    doc: userId,
    data: { status: 'active' },
    addTimestamp: true
  });
  console.log(`Updated document: ${docId}`);
} catch (error) {
  if (error.code === 'not-found') {
    console.error('Document does not exist');
  } else if (error.code === 'permission-denied') {
    console.error('Permission denied to update document');
  } else {
    console.error('Update failed:', error);
  }
}
```

### Partial Update with Validation
```typescript
const { updateData } = useFirestoreUpdate();

try {
  if (!Object.keys(updates).length) {
    throw new Error('No updates provided');
  }
  
  await updateData({
    collection: 'profiles',
    doc: profileId,
    data: updates,
    addTimestamp: true
  });
} catch (error) {
  console.error('Update failed:', error.message);
}
```
</details>

<details>
<summary><strong>useFirestoreTransaction</strong></summary>

### Batch Operations with Error Handling
```typescript
const { executeBatch } = useFirestoreTransaction();

try {
  const operations = [
    {
      type: 'update' as const,
      collection: 'users',
      doc: 'user1',
      data: { status: 'active' }
    },
    {
      type: 'set' as const,
      collection: 'logs',
      doc: 'log1',
      data: { action: 'user_activation' }
    }
  ];
  
  const docIds = await executeBatch(operations);
  console.log('Updated documents:', docIds);
} catch (error) {
  if (error.code === 'aborted') {
    console.error('Transaction was aborted');
  } else {
    console.error('Batch operation failed:', error);
  }
}
```

### Transaction with Retry Logic
```typescript
const { executeTransaction } = useFirestoreTransaction();

const MAX_RETRIES = 3;
let attempts = 0;

const performTransaction = async () => {
  try {
    const result = await executeTransaction(async (transaction, firestore) => {
      const docRef = firestore().collection('inventory').doc('item1');
      const doc = await transaction.get(docRef);
      
      if (!doc.exists) throw new Error('Document not found');
      
      const newStock = doc.data().stock - 1;
      if (newStock < 0) throw new Error('Insufficient stock');
      
      transaction.update(docRef, { stock: newStock });
      return { success: true, remaining: newStock };
    });
    return result;
  } catch (error) {
    if (error.code === 'aborted' && attempts < MAX_RETRIES) {
      attempts++;
      console.log(`Retrying transaction (${attempts}/${MAX_RETRIES})`);
      return performTransaction();
    }
    throw error;
  }
};
```
</details>

<details>
<summary><strong>useIsDocumentExist</strong></summary>

### Check Document Existence with Error Handling
```typescript
const { isExist } = useIsDocumentExist();

try {
  const exists = await isExist({
    collection: 'users',
    doc: userId
  });
  console.log(`Document exists: ${exists}`);
} catch (error) {
  if (error.code === 'permission-denied') {
    console.error('Permission denied to check document');
  } else {
    console.error('Existence check failed:', error);
  }
}
```

### Multi-Project Existence Check
```typescript
const { isExist } = useIsDocumentExist();

try {
  const [existsInMain, existsInBackup] = await Promise.all([
    isExist({
      collection: 'users',
      doc: userId,
      firebaseProject: 'main-project'
    }),
    isExist({
      collection: 'users',
      doc: userId,
      firebaseProject: 'backup-project'
    })
  ]);
  
  console.log('Document status:', {
    main: existsInMain,
    backup: existsInBackup
  });
} catch (error) {
  console.error('Multi-project check failed:', error);
}
```
</details>

<details>
<summary><strong>useCollectionListener</strong></summary>

### Real-time Collection Updates with Error Handling
```typescript
const { listenToCollection } = useCollectionListener();

const unsubscribe = listenToCollection({
  collection: 'users',
  where: [['status', '==', 'online']],
  orderBy: [['lastSeen', 'desc']],
  limit: 10,
  onData: (documents) => {
    try {
      console.log('Collection updated:', documents);
      // Process documents
    } catch (error) {
      console.error('Error processing documents:', error);
    }
  },
  onError: (error) => {
    if (error.code === 'permission-denied') {
      console.error('Permission denied to access collection');
    } else {
      console.error('Collection listener error:', error);
    }
  }
});

// Cleanup listener when component unmounts
useEffect(() => {
  return () => unsubscribe();
}, []);
```

### Filtered Collection Listening
```typescript
const { listenToCollection } = useCollectionListener();

try {
  const unsubscribe = listenToCollection({
    collection: 'orders',
    where: [
      ['status', '==', 'pending'],
      ['amount', '>', 1000]
    ],
    orderBy: [['createdAt', 'desc']],
    onData: (orders) => {
      console.log(`Received ${orders.length} pending high-value orders`);
    },
    onError: (error) => {
      console.error('Order listener error:', error);
    }
  });
  
  // Return cleanup function
  return unsubscribe;
} catch (error) {
  console.error('Error setting up listener:', error);
}
```
</details>

<details>
<summary><strong>useDocumentListener</strong></summary>

### Real-time Document Updates with Error Recovery
```typescript
const { listenToDocument } = useDocumentListener();

const setupDocumentListener = (docId: string) => {
  let retryCount = 0;
  const MAX_RETRIES = 3;
  
  const subscribe = () => {
    const unsubscribe = listenToDocument({
      collection: 'users',
      doc: docId,
      onData: (data) => {
        if (data.exists) {
          console.log('Document updated:', data.data);
          retryCount = 0; // Reset retry count on successful update
        } else {
          console.log('Document deleted or does not exist');
        }
      },
      onError: (error) => {
        console.error('Listener error:', error);
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          console.log(`Retrying connection (${retryCount}/${MAX_RETRIES})`);
          unsubscribe();
          setTimeout(subscribe, 1000 * retryCount);
        } else {
          console.error('Max retries reached');
        }
      }
    });
    
    return unsubscribe;
  };
  
  return subscribe();
};

// Usage in component
useEffect(() => {
  const unsubscribe = setupDocumentListener(userId);
  return () => unsubscribe();
}, [userId]);
```

### Multi-Document Synchronized Listening
```typescript
const { listenToDocument } = useDocumentListener();

const listenToRelatedDocuments = (mainDocId: string) => {
  const unsubscribers: (() => void)[] = [];
  
  try {
    // Listen to main document
    unsubscribers.push(
      listenToDocument({
        collection: 'orders',
        doc: mainDocId,
        onData: (orderData) => {
          if (orderData.exists) {
            // Start listening to related documents
            const userId = orderData.data?.userId;
            if (userId) {
              unsubscribers.push(
                listenToDocument({
                  collection: 'users',
                  doc: userId,
                  onData: (userData) => {
                    console.log('Related user data:', userData);
                  },
                  onError: (error) => {
                    console.error('User listener error:', error);
                  }
                })
              );
            }
          }
        },
        onError: (error) => {
          console.error('Order listener error:', error);
        }
      })
    );
    
    // Return cleanup function for all listeners
    return () => unsubscribers.forEach(unsubscribe => unsubscribe());
  } catch (error) {
    console.error('Error setting up listeners:', error);
    unsubscribers.forEach(unsubscribe => unsubscribe());
  }
};
```
</details>
