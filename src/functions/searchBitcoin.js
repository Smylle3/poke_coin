const { moneyUrl } = require('utils/api')

const SearchBitcoin = (setCotacao) => {
    fetch(moneyUrl)
        .then((response) => response.json())
        .then((data) => {
            setCotacao(data.data.amount)
        })
}

export { SearchBitcoin }
