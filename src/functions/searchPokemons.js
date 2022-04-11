const { baseUrl } = require('utils/api')

const SearchPokemons = (
    event,
    pokemonName,
    setPokemonName,
    setPokemonList,
    setPokemonHistory,
    toast
) => {
    const RandomNumber = Math.floor(Math.random() * 999999) - 999999
    const RandomNumber2 = Math.floor(Math.random() * -999999) - 0

    setPokemonName('')
    event.preventDefault()

    fetch(`${baseUrl}${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
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
        })
        .catch((err) => {
            toast({
                title: 'Pokemon não encontrado!',
                status: 'error',
                isClosable: true,
                duration: 3000,
                position: "top-right"
            })
        })
}

export default SearchPokemons
