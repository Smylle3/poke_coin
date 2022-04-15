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
    signInWithPopup,
    updateProfile
} from 'firebase/auth'
import {
    auth,
    googleProvider,
    gitProvider,
    twitterProvider
} from 'config/firebaseConfig'

export const AuthContext = createContext({})

export const AuthProvider = (props) => {
    const [user, setUser] = useState({})
    const [providerUser, setProviderUser] = useState(null)

    const [pokemonList, setPokemonList] = useState([])
    const [pokemonHistory, setPokemonHistory] = useState([])
    const [bitcoinValue, setBitcointValue] = useState(0)
    const [pokemonName, setPokemonName] = useState('')

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (userName, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: null
        })
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
            setProviderUser(currentUser.providerData[0].providerId)
            SearchBitcoin(setBitcointValue)
        })
        return () => {
            unSubscribe()
        }
    }, [providerUser])

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
                providerUser,
                logOut,
                logIn,
                loginWithGoogle,
                loginWithGitHub,
                loginWithTwitter,
                updateUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
