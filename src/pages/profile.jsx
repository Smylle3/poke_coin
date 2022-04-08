import React, { useEffect, useState } from 'react'
import { BsFillArrowDownCircleFill } from 'react-icons/bs'
import './styles.css'
import Orders from 'components/orders'
import History from 'components/history'
import SearchPokemons from 'context/searchPokemons'
import { SearchBitcoin } from 'context/searchBitcoin'

export default function Profile() {
    const [pokeName, setPokeName] = useState('')
    const [pokeList, setPokeList] = useState([])
    //const [pokeFullList, setPokeFullList] = useState([])
    const [cotacao, setCotacao] = useState(0)

    useEffect(() => {
        SearchBitcoin(setCotacao)
    }, [])

    function removePokemon(DeleteIndex) {
        for (let index = 0; index < pokeList.length; index++) {
            if (pokeList[index].name === DeleteIndex.name) {
                pokeList.splice(index, 1)
                break
            }
        }
    }

    return (
        <div className="container">
            <div className="leftContainer">
                <div className="imagens">
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
                            SearchPokemons(
                                pokeName,
                                pokeList,
                                setPokeList
                            )
                        }}
                    >
                        Comprar
                    </button>
                </form>

                <a href="#orders" className="scroll">
                    <BsFillArrowDownCircleFill size="40" />
                </a>
            </div>
            <div className="rightContainer" id="orders">
                <Orders
                    pokeName={pokeName}
                    pokeList={pokeList}
                    setPokeList={setPokeList}
                    cotacao={cotacao}
                    setCotacao={setCotacao}
                    onClick={removePokemon}
                />
                <History />
                {/*<div className="boxContainer">
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
                </div>*/}
            </div>
        </div>
    )
}
