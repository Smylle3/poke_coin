export default function FullValue(setValueUser, pokemonList, bitcoinValue) {
    let value = 0
    for (let index = 0; index < pokemonList.length; index++) {
        value += pokemonList[index].exp
    }
    setValueUser((value* 0.000001 * bitcoinValue).toFixed(2).replace('.', ','))
}