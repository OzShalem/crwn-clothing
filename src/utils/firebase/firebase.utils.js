import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAstVL50vVvcxz4GfrBoAXsXuixvwArdYw",
    authDomain: "crwn-clothing-db-64c10.firebaseapp.com",
    projectId: "crwn-clothing-db-64c10",
    storageBucket: "crwn-clothing-db-64c10.appspot.com",
    messagingSenderId: "676754574256",
    appId: "1:676754574256:web:1ea8cea844446e52182475"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}