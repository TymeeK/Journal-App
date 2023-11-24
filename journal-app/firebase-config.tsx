import { initializeApp } from 'firebase/app';
import { Auth, getAuth, GoogleAuthProvider, User } from 'firebase/auth';
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
const entryCollections = collection(db, 'entries');
const ENTRIES: string = 'entries';

export const getEntryData = async (user: User | null | undefined) => {
    if (user === null || user === undefined) return;

    const docRef = doc(db, ENTRIES, user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        console.log('No such document!');
        return;
    }
    return docSnap.data();
};

export const updateJournalEntry = async (
    user: User | null | undefined,
    entry: string
) => {
    try {
        if (user === undefined || user === null) return;
        const entryData = await getEntryData(user);
        console.log(entryData?.entryList[0].num);

        const userRef = doc(db, 'entries', user.uid);
        // await updateDoc(userRef, {
        //     entryList: arrayUnion({ num: 1, content: entry }),
        // });
    } catch (error) {
        console.error('Error loading document', error);
    }
};

export const addUser = async (user: User | null | undefined) => {
    try {
        if (user === null || user === undefined) return;

        const docRef = doc(db, 'entries', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return;
        }

        const newDoc = await setDoc(doc(entryCollections, user.uid), {
            user: user.displayName,
            entryList: [{ num: 1, entryContent: '' }],
        });
    } catch (e) {
        console.error('Error loading document: ', e);
    }
};
