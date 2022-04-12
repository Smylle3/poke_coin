import React from 'react'
import { useAuth } from 'context/auth'

import { IoReload } from 'react-icons/io5'
import { MdDeleteForever } from 'react-icons/md'
import {
    Center,
    Flex,
    Heading,
    IconButton,
    useToast
} from '@chakra-ui/react'

import MyTable from './myTable'

import { SearchBitcoin } from 'functions/searchBitcoin'
import { DeletePokemons } from 'functions/deletePokemons'

export default function Orders() {
    const {
        pokemonList,
        bitcoinValue,
        setBitcointValue,
        setPokemonHistory
    } = useAuth()
    const toast = useToast()

    function deletePokemon(data) {
        DeletePokemons(data, pokemonList, setPokemonHistory)
    }

    return (
        <>
            <Flex
                bg="defaultColor.400"
                h="mid"
                w="full"
                flexDirection="column"
                alignItems="flex-start"
                padding="20px 10px"
            >
                <Center marginBottom={5}>
                    <Heading
                        fontFamily="heading"
                        color="defaultColor.500"
                    >
                        Ordens
                    </Heading>
                    <IconButton
                        onClick={(event) => {
                            SearchBitcoin(setBitcointValue)
                            toast({
                                title: 'Atualizado!',
                                status: 'success',
                                isClosable: true,
                                duration: 3000,
                                position: 'top-right',
                            })
                        }}
                        isRound
                        colorScheme="green"
                        aria-label="Refresh"
                        icon={<IoReload />}
                        size="sm"
                        margin="0px 10px"
                    />
                </Center>
                <MyTable
                    Avatar={null}
                    Nome={null}
                    Action={null}
                    Valor={null}
                    Sell={null}
                    BGColor="defaultColor.500"
                    Color="defaultColor.400"
                    Width="84%"
                />
                <Flex
                    display="flex"
                    direction="column"
                    margin="10px 0px"
                    overflowY="scroll"
                    h="90%"
                    w="100%"
                    maxH="90%"
                >
                    {pokemonList.map((pokemon) => (
                        <Flex alignItems="center" key={pokemon.id}>
                            <MyTable
                                Avatar={pokemon.avatar}
                                Nome={pokemon.name}
                                Action={pokemon.action}
                                Valor={`$ ${(
                                    pokemon.exp *
                                    0.000001 *
                                    bitcoinValue
                                )
                                    .toFixed(2)
                                    .replace('.', ',')}`}
                                Sell="yes"
                                Color="defaultColor.500"
                                Width="85%"
                            />
                            <IconButton
                                id={`${pokemon.id}`}
                                onClick={(event) =>
                                    deletePokemon(pokemon)
                                }
                                margin="0px 10px"
                                isRound
                                colorScheme="red"
                                aria-label="Delete"
                                icon={<MdDeleteForever size={25} />}
                            />
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </>
    )
}
