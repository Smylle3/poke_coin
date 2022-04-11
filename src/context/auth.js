import { SearchBitcoin } from 'functions/searchBitcoin'
import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'

export const AuthContext = createContext({})

export const AuthProvider = (props) => {
    const [pokemonList, setPokemonList] = useState([])
    const [pokemonHistory, setPokemonHistory] = useState([])
    const [bitcoinValue, setBitcointValue] = useState(0)
    const [pokemonName, setPokemonName] = useState('')

    useEffect(() => {
        SearchBitcoin(setBitcointValue)
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
                setPokemonHistory
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
