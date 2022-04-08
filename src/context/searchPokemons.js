import { baseUrl } from 'utils/api'

const SearchPokemons = (pokeName, pokeList, setPokeList) => {
    fetch(`${baseUrl}${pokeName}`)
        .then((response) => response.json())
        .then((data) => {
            setPokeList((arr) => [
                ...arr,
                {
                    id: pokeList.length,
                    action: 'Buy',
                    name: data.name,
                    exp: data.base_experience
                }
            ])
        })
        .catch((err) => alert('Pokemon não encontrado!'))
}

export default SearchPokemons
