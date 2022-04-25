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
    bitcoinValue,
    justInfo,
    setInfo
) => {
    const RandomNumber = Math.floor(Math.random() * 999999) - 999999
    const RandomNumber2 = Math.floor(Math.random() * -999999) - 0
    const Cotacao = (0.000001 * bitcoinValue).toFixed(2)
    
    var date = new Date()
    var day = date.getDate() // 1-31
    var month = date.getMonth() // 0-11 (zero=janeiro)
    var year = date.getFullYear() // 2 dígitos
    var hour = date.getHours() // 0-23
    var min = date.getMinutes() // 0-59
    var sec = date.getSeconds() // 0-59
    var str_date = day + '/' + (month + 1) + '/' + year
    var str_hour = hour + ':' + min + ':' + sec

    setPokemonName('')
    event.preventDefault()

    fetch(`${baseUrl}${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
            if (justInfo === true) {
                setInfo(data)
            } else {
                if (userInitialValue - data.base_experience * Cotacao < 0) {
                    MyToast(
                        toast,
                        'Você não possui fundos para comprar esse pokémon!',
                        'error'
                    )
                } else {
                    setUserInitialValue(userInitialValue - data.base_experience * Cotacao)
                    setPokemonList((arr) => [
                        ...arr,
                        {
                            id: RandomNumber,
                            avatar: data.sprites.front_default,
                            name: data.name,
                            exp: data.base_experience,
                            valueBuy: data.base_experience * Cotacao,
                            action: 'Buy',
                            timeBuy: str_hour,
                            dateBuy: str_date
                        }
                    ])
                    setPokemonHistory((arr) => [
                        ...arr,
                        {
                            id: RandomNumber2,
                            avatar: data.sprites.front_default,
                            name: data.name,
                            exp: data.base_experience,
                            action: 'Buy',
                            timeBuy: str_hour,
                            dateBuy: str_date
                        }
                    ])
                }
            }
        })
        .catch((err) => {
            MyToast(toast, 'Pokemon não encontrado!', 'error')
        })
}

export default SearchPokemons
