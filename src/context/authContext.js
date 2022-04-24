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
import { doc, setDoc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import {
    auth,
    googleProvider,
    gitProvider,
    twitterProvider,
    db
} from 'config/firebaseConfig'
import FullValue from 'functions/fullWalletValue'

export const AuthContext = createContext({})

export const AuthProvider = (props) => {
    const [user, setUser] = useState({})
    const [providerUser, setProviderUser] = useState(null)
    const [userInitialValue, setUserInitialValue] = useState(0)
    const [userCurrentValue, setUserCurrentValue] = useState(0)
    const [valuePokemonsUser, setValuePokemonsUser] = useState(0)
    const [loading, setLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [openAbout, setOpenAbout] = useState(true)
    const authUser = getAuth()

    const [pokemonList, setPokemonList] = useState([])
    const [pokemonHistory, setPokemonHistory] = useState([])
    const [bitcoinValue, setBitcointValue] = useState(0)
    const [pokemonName, setPokemonName] = useState('')
    /*FUNÇÕES REFERENTE AO TRATAMENTO DE USUÁRIOS*/
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
            if (authUser.currentUser === null) {
                setIsLogin(false)
            } else {
                setIsLogin(true)
            }
            currentUser
                ? setProviderUser(currentUser.providerData[0].providerId)
                : setProviderUser(null)
            SearchBitcoin(setBitcointValue)
        })
        return () => {
            unSubscribe()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [providerUser, authUser.currentUser])

    /*FUNÇÕES REFERENTE AO TRATAMENTO DO BANCO DE DADOS*/
    useEffect(() => {
        setPokemonList([])
        setPokemonHistory([])
        setLoading(true)
        if (isLogin) {
            if (user.uid !== undefined) {
                setLoading(false)
                getData()
                SearchBitcoin(setBitcointValue)
            } else {
                setLoading(true)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin])

    useEffect(() => {
        setData()
        FullValue(setValuePokemonsUser, pokemonList, bitcoinValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemonList.length])

    const getData = async () => {
        if (user && user.uid !== undefined) {
            const userInformations = doc(db, `users/${user.uid}`)
            try {
                const userObject = await getDoc(userInformations)
                setPokemonList(userObject.data().pokemonsOrders)
                setPokemonHistory(userObject.data().pokemonsHistory)
                setUserInitialValue(userObject.data().UserInitialMoney)
            } catch (error) {
                if (error) {
                    try {
                        const docData = {
                            UserInitialMoney: userInitialValue,
                            UserMoney: userCurrentValue,
                            email: user.email,
                            pokemonsHistory: pokemonHistory,
                            pokemonsOrders: pokemonList,
                            userName: user.displayName
                        }
                        await setDoc(userInformations, docData)
                    } catch (error2) {}
                }
            }
        }
    }

    const setData = async () => {
        if (user && user.uid !== undefined) {
            const userInformations = doc(db, `users/${user.uid}`)
            const docData = {
                UserInitialMoney: userInitialValue,
                UserMoney: userCurrentValue,
                email: user.email,
                pokemonsHistory: pokemonHistory,
                pokemonsOrders: pokemonList,
                userName: user.displayName
            }
            await setDoc(userInformations, docData)
        }
    }

    const updateData = async () => {
        if (user && user.uid !== undefined) {
            const userInformations = doc(db, `users/${user.uid}`)
            const docData = {
                UserInitialMoney: userInitialValue,
                pokemonsHistory: pokemonHistory,
                pokemonsOrders: pokemonList
            }
            try {
                await updateDoc(userInformations, docData)
            } catch (error) {
                if (error.code === 'not-found') {
                    try {
                        await setDoc(userInformations, docData)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        }
    }

    const deleteData = async () => {
        await deleteDoc(doc(db, 'users', user.uid))
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
                updateData,
                setData,
                deleteData,
                loading,
                userInitialValue,
                setUserInitialValue,
                setValuePokemonsUser,
                valuePokemonsUser,
                setUserCurrentValue,
                openAbout,
                setOpenAbout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
