import { initializeApp } from 'firebase/app';
import { Auth, getAuth, GoogleAuthProvider, User } from 'firebase/auth';
import {
    addDoc,
    Firestore,
    getFirestore,
    setDoc,
    collection,
    doc,
    getDoc,
    updateDoc,
    CollectionReference,
    DocumentData,
    query,
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
const userCollections: CollectionReference<DocumentData, DocumentData> =
    collection(db, 'users');
const JOURNAL_COLL: string = 'Journal Entries';
const USER_COLL: string = 'users';

export interface entryObject {
    id: string;
    title: string;
    content: string;
}

export const createEntry = async (user: User | null | undefined) => {
    try {
        if (user === null || user === undefined) return;

        const entryCollections = collection(
            userCollections,
            user.uid,
            JOURNAL_COLL
        );
        const currentDoc = await addDoc(entryCollections, {
            title: '',
            content: '',
        });
        return currentDoc.id;
    } catch (e) {
        console.error('Error loading document: ', e);
    }
};

export const readEntry = async (
    user: User | null | undefined,
    journalID: string
) => {
    if (user === null || user === undefined) return;
    const docSnap = await getDoc(
        doc(db, USER_COLL, user.uid, JOURNAL_COLL, journalID)
    );
    if (!docSnap.exists()) {
        return;
    }
    return docSnap.data();
};

export const updateEntry = async (
    user: User | null | undefined,
    journalID: string,
    entry: string,
    title: string
) => {
    try {
        if (user === undefined || user === null) return;
        const entryRef = doc(db, USER_COLL, user.uid, JOURNAL_COLL, journalID);
        await updateDoc(entryRef, {
            title: title,
            content: entry,
        });
    } catch (error) {
        console.error('Error loading document', error);
    }
};

export const deleteEntry = async (
    user: User | null | undefined,
    journalID: string
) => {};

export const readAllEntries = async (user: User | null | undefined) => {
    try {
        const entry: entryObject[] = [];
        const singleEntry: entryObject = {
            id: '',
            title: '',
            content: '',
        };
        if (user === null || user === undefined) return;
        const querySnapshot = await getDocs(
            collection(db, USER_COLL, user.uid, JOURNAL_COLL)
        );
        querySnapshot.forEach((doc) => {
            singleEntry.id = doc.id;
            singleEntry.title = doc.data().title;
            singleEntry.content = doc.data().content;
            entry.push(singleEntry);
        });
        console.log(entry);
        return entry;
    } catch (error) {
        console.error('Error loading document');
    }
};

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
