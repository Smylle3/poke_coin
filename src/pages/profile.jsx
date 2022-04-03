import React, { useState } from 'react'
import baseUrl from 'utils/api'
import './styles.css'

function Profile() {
    const [pokeName, setPokeName] = useState('')
    const [pokeNameSale, setPokeNameSale] = useState('')
    const [pokeList, setpokeList] = useState([])
    const [pokeListCot, setPokeListCot] = useState([])
    const [isBuy, setIsBuy] = useState(null)
    const [cotacao, setCotacao] = useState(0)
    var valorUsd = 0
    var key = 1

    async function handleRegister(event) {
        key += 1
        if (pokeName.length === 0 && pokeNameSale.length === 0) {
            alert('Digite o nome do pokemon!')
        } else {
            setPokeName('')
            setPokeNameSale('')
            if (event.target.id === 'Compra') {
                setIsBuy('Compra')
                fetch(`${baseUrl}${pokeName}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setpokeList((arr) => [...arr, data])
                        setPokeListCot((arr) => [...arr, data])
                    })
                    .catch((err) => console.log(err))
                console.log(pokeList)
                fetch(
                    'https://api.coinbase.com/v2/prices/spot?currency=USD'
                )
                    .then((response) => response.json())
                    .then((data) => {
                        setCotacao(data.data.amount)
                    })
            } else if (event.target.id === 'Venda') {
                setIsBuy('Venda')
                fetch(`${baseUrl}${pokeNameSale}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setPokeListCot((arr) => [...arr, data])
                        setpokeList((arr) => [...arr, data])
                    })
                    .catch((err) => console.log(err))
            }
        }
        console.log(key)
    }

    return (
        <div className="container">
            <div className="leftContainer">
                <h1 className="title">HUB de Negociação</h1>
                <form>
                    <label>Comprar pokemon</label>
                    <input
                        onChange={(e) => setPokeName(e.target.value)}
                        value={pokeName}
                        type="text"
                        placeholder="Digite o nome do Pokemon"
                        required
                    />
                    <button
                        id="Compra"
                        onClick={(e) => {
                            e.preventDefault()
                            handleRegister(e)
                        }}
                    >
                        Comprar
                    </button>
                </form>

                <form>
                    <label>Vender pokemon</label>
                    <input
                        onChange={(e) =>
                            setPokeNameSale(e.target.value)
                        }
                        value={pokeNameSale}
                        type="text"
                        placeholder="Digite o nome do Pokemon"
                        required
                    />
                    <button
                        id="Venda"
                        onClick={(e) => {
                            e.preventDefault()
                            handleRegister(e)
                        }}
                    >
                        Vender
                    </button>
                </form>
            </div>
            <div className="rightContainer">
                <div className="boxContainer">
                    <h1 className="title">Suas ordens</h1>
                    <div className="table">
                        <div>Nome da ação</div>
                        <div>Valor (USD)</div>
                    </div>
                    <div className="outMap2">
                        {pokeListCot.map((pokemon) => (
                            <div className="inMap2" key={key}>
                                <div>{pokemon.name}</div>
                                <div>
                                    {(valorUsd =
                                        pokemon.base_experience *
                                        0.00000001 *
                                        cotacao).toFixed(5)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="boxContainer2">
                    <h1 className="title">
                        Histórico de compras e vendas
                    </h1>
                    <div className="table">
                        <div>Ação</div>
                        <div>Nome</div>
                        <div>Base Exp</div>
                    </div>
                    <div className="outMap">
                        {pokeList.map((pokemon) => (
                            <div className="inMap" key={key}>
                                {isBuy === 'Compra' ? (
                                    <div>Buy</div>
                                ) : (
                                    <div>Sale</div>
                                )}{' '}
                                <div>{pokemon.name}</div>
                                <div>
                                    {pokemon.base_experience}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
