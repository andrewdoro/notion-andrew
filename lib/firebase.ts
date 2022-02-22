import { FirebaseApp, getApps, getApp, initializeApp } from 'firebase/app';
import { collection, CollectionReference, DocumentData, getFirestore } from 'firebase/firestore';
import { Reaction, User } from 'types';
let app: FirebaseApp;
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (getApps().length) app = getApp();
else app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

export const viewsCol = createCollection<{ views: number }>('views');
export const reactionsCol = createCollection<{ reactions: Reaction[]; users: User[] }>('reactions');
