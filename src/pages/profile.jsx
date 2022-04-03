import React, { useEffect, useState } from 'react'
import { baseUrl, moneyUrl } from 'utils/api'
import './styles.css'

export default function Profile() {
    const [pokeName, setPokeName] = useState('')
    const [pokeNameSale, setPokeNameSale] = useState('')
    const [pokeList, setpokeList] = useState([])
    const [pokeFullList, setPokeFullList] = useState([])
    const [cotacao, setCotacao] = useState(0)
    const [pokeValue, setPokeValue] = useState(0)

    /*UseEffect responsavel pela busca dos valor do dolar em bitcoin*/
    useEffect(() => {
        fetch(moneyUrl)
            .then((response) => response.json())
            .then((data) => {
                setCotacao(data.data.amount)
            })
    }, [pokeName, pokeNameSale])

    /*UseEffect responsável por atualizar o valor da carteira em dolar*/
    useEffect(() => {
        var valorUsd = 0
        for (let index = 0; index < pokeList.length; index++) {
            valorUsd += parseFloat(pokeList[index].cotacao)
            setPokeValue(valorUsd.toFixed(5))
        }
    }, [pokeFullList.length, pokeList])

    /*Função assincrona responsavel por todo sistema*/
    async function handleRegister(event) {
        if (pokeName.length === 0 && pokeNameSale.length === 0) {
            /*Verifica se os campos dos inputs estão vazios*/
            alert('Digite o nome do pokemon!')
        } else {
            setPokeName('') /*Reseta os valores no input*/
            setPokeNameSale('')

            if (event.target.id === 'Compra') {
                /*Verifica se o usuário efetuou uma compra ou uma venda*/
                fetch(
                    `${baseUrl}${pokeName}`
                ) /*Consome a API de pokemon buscando pelo pokemon digitado*/
                    .then((response) => response.json())
                    .then((data) => {
                        setpokeList((arr) => [
                            /*Preenche o array com as informações: id, ação feita, nome do pokemon e seu valor em dolar*/
                            ...arr,
                            {
                                id: pokeList.length + 1,
                                action: 'Buy',
                                name: data.name,
                                cotacao: (
                                    data.base_experience *
                                    0.00000001 *
                                    cotacao
                                ).toFixed(5)
                            }
                        ])
                        setPokeFullList((arr) => [
                            /*Preenche o array de histórico com id, ação feita, nome do pokemon e sua base de experiencia*/
                            ...arr,
                            {
                                id: pokeList.length ^ 8,
                                action: 'Buy',
                                name: data.name,
                                exp: data.base_experience
                            }
                        ])
                    })
                    .catch((err) =>
                        alert('Pokemon não encontrado!')
                    ) /*Informa que o pokemon não foi encontrado*/
            } else if (event.target.id === 'Venda') {
                let flag = false
                for (let index = 0; index < pokeList.length; index++) {
                    /*Busca pelo pokemon que o usuário deseja vender*/
                    if (pokeList[index].name === pokeNameSale) {
                        flag = true
                        pokeList.splice(
                            index,
                            1
                        ) /*Remove o pokemon do array de pokemons que o usuário possui*/
                        break
                    }
                }
                if (flag === false) {
                    alert('Você não possui esse pokemon!')
                } else {
                    fetch(`${baseUrl}${pokeNameSale}`)
                        .then((response) => response.json())
                        .then((data) => {
                            setPokeFullList((arr) => [
                                /*Insere o pokemon vendido no array de histórico com a ação "Sale indicando a venda dele"*/
                                ...arr,
                                {
                                    id: pokeList.length ^ 2,
                                    action: 'Sale',
                                    name: data.name,
                                    exp: data.base_experience
                                }
                            ])
                        })
                        .catch((err) =>
                            alert('Pokemon não encontrado!')
                        )
                }
                flag = false
            }
        }
    }

    return (
        <div className="container">
            <div className="leftContainer">
                <div className='imagens'>
                    <img
                        className="banner"
                        alt="Pokemon"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
                    />
                    <img
                        className="banner2"
                        alt="Pokemon"
                        src="https://s2.coinmarketcap.com/static/img/coins/200x200/1.png"
                    />
                </div>
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
                        {pokeList.map((pokemon) => (
                            <div className="inMap2" key={pokemon.id}>
                                <div>{pokemon.name}</div>
                                <div>$ {pokemon.cotacao}</div>
                            </div>
                        ))}
                    </div>
                    Valor total da sua carteira: $ {pokeValue}
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
                        {pokeFullList.map((pokemon) => (
                            <div className="inMap" key={-pokemon.id}>
                                <div>{pokemon.action}</div>
                                <div>{pokemon.name}</div>
                                <div>{pokemon.exp}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
