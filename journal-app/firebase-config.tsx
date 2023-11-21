import { initializeApp } from 'firebase/app';
import { Auth, getAuth, GoogleAuthProvider, User } from 'firebase/auth';
import {
    addDoc,
    Firestore,
    getFirestore,
    setDoc,
    collection,
    getDocs,
} from 'firebase/firestore';

const fireBaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(fireBaseConfig);

export const auth: Auth = getAuth(app);
export const provider: GoogleAuthProvider = new GoogleAuthProvider();
export const db: Firestore = getFirestore(app);

export const addJournalEntry = async (
    user: User | null | undefined,
    entry: string
) => {
    try {
        if (user === undefined || user === null) return;
        const querySnapshot = await getDocs(collection(db, 'entries'));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    } catch (error) {
        console.error('Error loading document');
    }
};

export const addUser = async (user: User | null | undefined) => {
    try {
        if (user === null || user === undefined) return;
        const docRef = await addDoc(collection(db, 'entries'), {
            user: user.uid,
            entry: '',
        });
    } catch (e) {
        console.error('Error loading document: ', e);
    }
};
