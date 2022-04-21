import { SearchBitcoin } from 'functions/searchBitcoin'
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    updateProfile,
    sendEmailVerification,
    updatePassword,
    getAuth,
    deleteUser,
    sendPasswordResetEmail
} from 'firebase/auth'
import {
    doc,
    setDoc,
    getDoc
} from 'firebase/firestore'
import {
    auth,
    googleProvider,
    gitProvider,
    twitterProvider,
    db
} from 'config/firebaseConfig'

export const AuthContext = createContext({})

export const AuthProvider = (props) => {
    const [user, setUser] = useState({})
    const [providerUser, setProviderUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const authUser = getAuth()

    const [pokemonList, setPokemonList] = useState([])
    const [pokemonHistory, setPokemonHistory] = useState([])
    const [bitcoinValue, setBitcointValue] = useState(0)
    const [pokemonName, setPokemonName] = useState('')

    /*FUNÇÕES REFENTE AO TRATAMENTO DE USUÁRIOS*/
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (userName) => {
        return updateProfile(auth.currentUser, {
            displayName: userName
        })
    }
    const updateAvatar = (photoUrl) => {
        return updateProfile(auth.currentUser, {
            photoURL: photoUrl
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
    const emailVerification = () => {
        return sendEmailVerification(authUser.currentUser)
    }
    const changePassword = (newPassword) => {
        return updatePassword(authUser.currentUser, newPassword)
    }
    const logOut = () => {
        return signOut(auth)
    }
    const deleteAccount = () => {
        return deleteUser(user)
    }
    const passRecovery = (email) => {
        return sendPasswordResetEmail(authUser, email)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            currentUser
                ? setProviderUser(currentUser.providerData[0].providerId)
                : setProviderUser(null)
            user.uid ? getData() : setLoading(true)
            SearchBitcoin(setBitcointValue)
        })
        return () => {
            unSubscribe()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [providerUser])

    /*FUNÇÕES REFENTE AO TRATAMENTO DO BANCO DE DADOS*/
    const getData = async () => {
        const userInformations = doc(db, `users/${user.uid}`)
        const userObject = await getDoc(userInformations)
        setPokemonList(userObject.data().pokemonsOrders)
        setPokemonHistory(userObject.data().pokemonsHistory)
    }

    const setData = async () => {
        const userInformations = doc(db, `users/${user.uid}`)
        const docData = {
            UserInitialMoney: 0,
            UserMoney: 0,
            email: user.email,
            pokemonsHistory: pokemonHistory,
            pokemonsOrders: pokemonList,
            userName: user.displayName
        }
        await setDoc(userInformations, docData)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                providerUser,
                pokemonName,
                pokemonList,
                pokemonHistory,
                bitcoinValue,
                setPokemonName,
                setPokemonList,
                setPokemonHistory,
                setBitcointValue,
                createUser,
                logIn,
                loginWithGoogle,
                loginWithGitHub,
                loginWithTwitter,
                updateUser,
                updateAvatar,
                emailVerification,
                changePassword,
                logOut,
                deleteAccount,
                passRecovery,
                setData,
                loading
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
