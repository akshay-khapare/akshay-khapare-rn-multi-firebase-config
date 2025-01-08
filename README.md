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
<summary><strong>useCollectionListener</strong></summary>

```typescript
const { listenToCollection } = useCollectionListener();

// Basic collection listening
const unsubscribe = listenToCollection<UserData>({
  collection: 'users',
  onData: (users) => {
    console.log('Users updated:', users);
  },
  onError: (error) => {
    console.error('Error listening to users:', error);
  }
});

// Advanced querying with filters and ordering
const unsubscribeFiltered = listenToCollection<ProductData>({
  collection: 'products',
  firebaseProject: 'store',
  where: [
    ['category', '==', 'electronics'],
    ['price', '<=', 1000]
  ],
  orderBy: [
    ['price', 'asc'],
    ['name', 'asc']
  ],
  limit: 10,
  onData: (products) => {
    console.log('Filtered products:', products);
  }
});

// Cleanup when component unmounts
return () => {
  unsubscribe();
  unsubscribeFiltered();
};
```
</details>

<details>
<summary><strong>useDocumentListener</strong></summary>

```typescript
const { listenToDocument } = useDocumentListener();

// Basic document listening
const unsubscribe = listenToDocument<UserProfile>({
  collection: 'users',
  doc: 'user123',
  onData: (userData) => {
    if (userData.exists) {
      console.log('User data:', userData.data);
    } else {
      console.log('User document does not exist');
    }
  }
});

// Multi-project document listening
const unsubscribeMultiProject = listenToDocument<OrderData>({
  collection: 'orders',
  doc: 'order123',
  firebaseProject: 'secondary',
  onData: (orderData) => {
    console.log('Order status:', orderData.data?.status);
  },
  onError: (error) => {
    console.error('Error listening to order:', error);
  }
});

// Cleanup
return () => {
  unsubscribe();
  unsubscribeMultiProject();
};
```
</details>

<details>
<summary><strong>useFirestoreGet</strong></summary>

```typescript
const { getData } = useFirestoreGet();

// Basic document retrieval
const fetchUserData = async () => {
  const result = await getData<UserProfile>({
    collection: 'users',
    doc: 'user123',
    firebaseProjectName: 'main'
  });
  
  if (result.exists) {
    console.log('User data:', result.data);
  }
};

// Type-safe data retrieval
interface ProductData {
  name: string;
  price: number;
  stock: number;
}

const fetchProduct = async (productId: string) => {
  const result = await getData<ProductData>({
    collection: 'products',
    doc: productId
  });
  
  if (result.exists && result.data) {
    const { name, price, stock } = result.data;
    console.log(`${name}: $${price} (${stock} in stock)`);
  }
};
```
</details>

<details>
<summary><strong>useFirestoreGetQuery</strong></summary>

```typescript
const { getQuery } = useFirestoreGetQuery();

// Basic query with filters
const fetchActiveUsers = async () => {
  const users = await getQuery({
    collection: 'users',
    where: [
      ['status', '==', 'active'],
      ['lastLogin', '>=', new Date(Date.now() - 86400000)]
    ],
    orderBy: [['lastLogin', 'desc']],
    limit: 10
  });
  console.log('Active users:', users);
};

// Pagination with cursors
const fetchPaginatedProducts = async (lastProduct?: any) => {
  const products = await getQuery({
    collection: 'products',
    orderBy: [['price', 'asc']],
    startAfter: lastProduct,
    limit: 20
  });
  return products;
};

// Complex query with multiple conditions
const searchProducts = async (category: string, minPrice: number, maxPrice: number) => {
  const products = await getQuery({
    collection: 'products',
    where: [
      ['category', '==', category],
      ['price', '>=', minPrice],
      ['price', '<=', maxPrice],
      ['inStock', '==', true]
    ],
    orderBy: [
      ['price', 'asc'],
      ['name', 'asc']
    ]
  });
  return products;
};
```
</details>

<details>
<summary><strong>useFirestoreSet</strong></summary>

```typescript
const { setData } = useFirestoreSet();

// Basic document creation
const createUser = async (userData: UserData) => {
  const docId = await setData({
    collection: 'users',
    doc: 'user123',
    data: userData,
    addTimestamp: true
  });
  console.log('Created user:', docId);
};

// Document creation with merge
const updateUserPartial = async (userId: string, partialData: Partial<UserData>) => {
  await setData({
    collection: 'users',
    doc: userId,
    data: partialData,
    merge: true,
    addTimestamp: true
  });
};

// Multi-project document creation
const createOrder = async (orderData: OrderData) => {
  await setData({
    collection: 'orders',
    doc: `order_${Date.now()}`,
    data: orderData,
    firebaseProject: 'commerce',
    addTimestamp: true
  });
};
```
</details>

<details>
<summary><strong>useFirestoreTransaction</strong></summary>

```typescript
const { executeBatch, executeTransaction } = useFirestoreTransaction();

// Batch operations
const updateMultipleDocuments = async () => {
  const operations = [
    {
      type: 'update' as const,
      collection: 'products',
      doc: 'prod1',
      data: { stock: 10 },
      addTimestamp: true
    },
    {
      type: 'set' as const,
      collection: 'inventory',
      doc: 'inv1',
      data: { lastChecked: new Date() },
      merge: true
    },
    {
      type: 'delete' as const,
      collection: 'archived',
      doc: 'old1'
    }
  ];
  
  const docIds = await executeBatch(operations);
  console.log('Updated documents:', docIds);
};

// Complex transaction
const transferFunds = async (fromAccount: string, toAccount: string, amount: number) => {
  await executeTransaction(async (transaction, firestore) => {
    const fromRef = firestore().collection('accounts').doc(fromAccount);
    const toRef = firestore().collection('accounts').doc(toAccount);
    
    const fromSnapshot = await transaction.get(fromRef);
    const toSnapshot = await transaction.get(toRef);
    
    const newFromBalance = fromSnapshot.data()!.balance - amount;
    const newToBalance = toSnapshot.data()!.balance + amount;
    
    transaction.update(fromRef, { balance: newFromBalance });
    transaction.update(toRef, { balance: newToBalance });
    
    return { fromBalance: newFromBalance, toBalance: newToBalance };
  });
};
```
</details>

<details>
<summary><strong>useFirestoreUpdate</strong></summary>

```typescript
const { updateData } = useFirestoreUpdate();

// Basic document update
const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  await updateData({
    collection: 'users',
    doc: userId,
    data: updates,
    addTimestamp: true
  });
};

// Multi-project document update
const updateOrderStatus = async (orderId: string, status: string) => {
  await updateData({
    collection: 'orders',
    doc: orderId,
    data: { status, lastUpdated: new Date() },
    firebaseProject: 'commerce',
    addTimestamp: true
  });
};

// Partial update with specific fields
const updateProductStock = async (productId: string, stockChange: number) => {
  await updateData({
    collection: 'products',
    doc: productId,
    data: {
      stock: stockChange,
      lastStockUpdate: new Date()
    }
  });
};
```
</details>

<details>
<summary><strong>useIsDocumentExist</strong></summary>

```typescript
const { isExist } = useIsDocumentExist();

// Basic existence check
const checkUserExists = async (userId: string) => {
  const exists = await isExist({
    collection: 'users',
    doc: userId
  });
  
  if (exists) {
    console.log('User exists');
  } else {
    console.log('User not found');
  }
};

// Multi-project existence check
const verifyOrder = async (orderId: string) => {
  const orderExists = await isExist({
    collection: 'orders',
    doc: orderId,
    firebaseProject: 'commerce'
  });
  
  return orderExists;
};

// Conditional operations based on existence
const createOrUpdateUser = async (userId: string, userData: UserData) => {
  const exists = await isExist({
    collection: 'users',
    doc: userId
  });
  
  if (exists) {
    // Update existing user
    await updateData({ collection: 'users', doc: userId, data: userData });
  } else {
    // Create new user
    await setData({ collection: 'users', doc: userId, data: userData });
  }
};
```
</details>
