import MyToast from 'components/myToast'
const { baseUrl } = require('utils/api')

const SearchPokemons = (
    event,
    pokemonName,
    setPokemonName,
    setPokemonList,
    setPokemonHistory,
    toast,
    userInitialValue,
    setUserInitialValue,
    bitcoinValue
) => {
    const RandomNumber = Math.floor(Math.random() * 999999) - 999999
    const RandomNumber2 = Math.floor(Math.random() * -999999) - 0
    const Cotacao = (0.000001 * bitcoinValue).toFixed(2)

    setPokemonName('')
    event.preventDefault()

    fetch(`${baseUrl}${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
            if (userInitialValue - data.base_experience * Cotacao < 0) {
                MyToast(
                    toast,
                    'Você não possui fundos para comprar esse pokémon!',
                    'error'
                )
            } else {
                setUserInitialValue(
                    userInitialValue -
                        (data.base_experience * 0.000001 * bitcoinValue).toFixed(2)
                )
                setPokemonList((arr) => [
                    ...arr,
                    {
                        id: RandomNumber,
                        avatar: data.sprites.front_default,
                        name: data.name,
                        exp: data.base_experience,
                        action: 'Buy'
                    }
                ])
                setPokemonHistory((arr) => [
                    ...arr,
                    {
                        id: RandomNumber2,
                        avatar: data.sprites.front_default,
                        name: data.name,
                        exp: data.base_experience,
                        action: 'Buy'
                    }
                ])
            }
        })
        .catch((err) => {
            MyToast(
                toast,
                'Pokemon não encontrado!',
                'error'
            )
        })
}

export default SearchPokemons
