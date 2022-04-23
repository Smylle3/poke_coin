const DeletePokemons = (
    data,
    pokemonList,
    setPokemonHistory,
    bitcoinValue,
    setUserInitialValue,
    userInitialValue
) => {
    const RandomNumber = Math.floor(Math.random() * 999999) - 999999
    const sellValue = data.exp * 0.000001 * bitcoinValue

    const deleteIndex = pokemonList.findIndex((element) => element.id === data.id)
    pokemonList.splice(deleteIndex, 1)

    setUserInitialValue((parseFloat(userInitialValue) + sellValue).toFixed(2))

    setPokemonHistory((arr) => [
        ...arr,
        {
            id: RandomNumber,
            avatar: data.avatar,
            name: data.name,
            exp: data.exp,
            action: 'Sale'
        }
    ])
}

export { DeletePokemons }
