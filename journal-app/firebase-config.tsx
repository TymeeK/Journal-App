import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    OAuthCredential,
    User,
    UserCredential,
    signInWithRedirect,
    Unsubscribe,
} from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth/cordova';

const fireBaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(fireBaseConfig);

const auth = getAuth(app);

export function createUser(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}
const provider = new GoogleAuthProvider();
export function googleLogin() {
    signInWithRedirect(auth, provider);
}

export async function checkIfLoggedIn() {
    let loginState: boolean = false;
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            loginState = true;
        }
    });
    return loginState;
}
