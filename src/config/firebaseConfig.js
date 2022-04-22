import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    TwitterAuthProvider
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const gitProvider = new GithubAuthProvider()
const twitterProvider = new TwitterAuthProvider()

export { auth, googleProvider, gitProvider, twitterProvider, app, db }
