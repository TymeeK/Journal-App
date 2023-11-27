import { initializeApp } from 'firebase/app';
import { Auth, getAuth, GoogleAuthProvider, User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth/cordova';
import {
    addDoc,
    Firestore,
    getFirestore,
    setDoc,
    collection,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    query,
    where,
    DocumentData,
    arrayRemove,
    increment,
    DocumentReference,
    QuerySnapshot,
} from 'firebase/firestore';
import { Content } from 'next/font/google';
import { userAgent } from 'next/server';

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
const userCollections = collection(db, 'users');
export let CURRENT_JOURNAL = '';
export const createEntry = async (user: User | null | undefined) => {
    try {
        if (user === null || user === undefined) return;

        const entryCollections = collection(
            userCollections,
            user.uid,
            'Journal Entries'
        );
        const currentDoc = await addDoc(entryCollections, {
            content: '',
        });
        CURRENT_JOURNAL = currentDoc.id;
    } catch (e) {
        console.error('Error loading document: ', e);
    }
};

export const readEntry = async (user: User | null | undefined) => {
    if (user === null || user === undefined) return;

    const docRef: DocumentReference<DocumentData, DocumentData> = doc(
        db,
        'users',
        user.uid,
        'Journal Entries'
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log(docSnap.data());
    }
};

export const updateJournalEntry = async (
    user: User | null | undefined,
    entry: string
) => {
    try {
        if (user === undefined || user === null) return;
        const entryData: DocumentData | undefined = await readEntry(user);
        if (entryData === undefined) return;
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
            entries: [{ content: entry }],
        });
    } catch (error) {
        console.error('Error loading document', error);
    }
};

export const deleteEntry = async (user: User | null | undefined) => {};

export const createUser = async (user: User | null | undefined) => {
    try {
        if (user === null || user === undefined) return;

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return;
        }

        const newDoc = await setDoc(doc(userCollections, user.uid), {
            user: user.displayName,
        });
    } catch (e) {
        console.error('Error loading document: ', e);
    }
};
