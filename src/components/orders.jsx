import React, { useState } from 'react'
import { useAuth } from 'context/authContext'

import {
    Center,
    Flex,
    Heading,
    IconButton,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { IoReload } from 'react-icons/io5'
import { MdDeleteForever } from 'react-icons/md'

import MyTable from './myTable'

import { SearchBitcoin } from 'functions/searchBitcoin'
import AlertSale from './alertDialog'
import MyToast from './myToast'

export default function Orders() {
    const { pokemonList, bitcoinValue, setBitcointValue } = useAuth()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [pokeNameSell, setPokeNameSell] = useState('')

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
                            MyToast(toast, "Atualizado com sucesso", "success")
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
                                onClick={() => {
                                    setPokeNameSell(pokemon)
                                    onOpen()
                                }}
                                margin="0px 10px"
                                isRound
                                colorScheme="red"
                                aria-label="Delete"
                                icon={<MdDeleteForever size={25} />}
                            />
                        </Flex>
                    ))}
                </Flex>
                <AlertSale
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    pokeNameSell={pokeNameSell}
                />
            </Flex>
        </>
    )
}
