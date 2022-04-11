const DeletePokemons = (data, pokemonList, setPokemonHistory) => {
    const RandomNumber = Math.floor(Math.random() * 999999) - 999999

    const deleteIndex = pokemonList.findIndex(
        (element) => element.id === data.id
    )

    pokemonList.splice(deleteIndex, 1)
        setPokemonHistory((arr) => [
            ...arr,
            {
                id: RandomNumber,
                avatar: data.avatar,
                name: data.name,
                exp: data.exp,
                action: 'Sale',
            }
        ])
}

export { DeletePokemons }
