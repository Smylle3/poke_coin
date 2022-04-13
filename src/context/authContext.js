import { SearchBitcoin } from 'functions/searchBitcoin'
import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup
} from 'firebase/auth'
import { auth, googleProvider, gitProvider, twitterProvider } from 'config/firebaseConfig'

export const AuthContext = createContext({})

export const AuthProvider = (props) => {
    const [user, setUser] = useState({})

    const [pokemonList, setPokemonList] = useState([])
    const [pokemonHistory, setPokemonHistory] = useState([])
    const [bitcoinValue, setBitcointValue] = useState(0)
    const [pokemonName, setPokemonName] = useState('')

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const loginWithGitHub = () => {
        return signInWithPopup(auth, gitProvider)
    }

    const loginWithTwitter = () => {
        return signInWithPopup(auth, twitterProvider)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log(currentUser)
        })
        SearchBitcoin(setBitcointValue)
        return () => {
            unSubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                pokemonList,
                setPokemonList,
                bitcoinValue,
                setBitcointValue,
                pokemonName,
                setPokemonName,
                pokemonHistory,
                setPokemonHistory,
                createUser,
                user,
                logOut,
                logIn,
                loginWithGoogle,
                loginWithGitHub,
                loginWithTwitter
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
