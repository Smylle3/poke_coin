import { Center, Flex, Heading, IconButton } from '@chakra-ui/react'
import { IoReload } from 'react-icons/io5'
import React from 'react'
import MyTable from './myTable'
import { SearchBitcoin } from 'context/searchBitcoin'
import { MdDeleteForever } from 'react-icons/md'

export default function Orders(props) {
    return (
        <>
            <Flex
                bg="defaultColor.400"
                h="mid"
                w="full"
                flexDirection="column"
                alignItems="center"
                padding="20px 0px"
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
                            SearchBitcoin(props.setCotacao)
                            alert('Atualizado!')
                        }}
                        isRound
                        colorScheme="green"
                        aria-label="Refresh"
                        icon={<IoReload />}
                        size="sm"
                        margin="0px 10px"
                    />
                </Center>
                <Flex w="95%" flexDirection="column">
                    <MyTable
                        Avatar={null}
                        Nome={null}
                        Action={null}
                        Valor={null}
                        Sell={null}
                        BGColor="defaultColor.500"
                        Color="defaultColor.400"
                    />
                    {props.pokeList.map((pokemon) => (
                        <Flex alignItems="center" key={pokemon.id}>
                            <MyTable
                                Avatar={null}
                                Nome={pokemon.name}
                                Action={pokemon.action}
                                Valor={(
                                    pokemon.exp *
                                    0.00000001 *
                                    props.cotacao
                                ).toFixed(5)}
                                Sell="yes"
                                Color="defaultColor.500"
                            />
                            <IconButton
                                id={`${pokemon.id}`}
                                onClick={(event) => {
                                    props.onClick(pokemon)
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
            </Flex>
        </>
    )
}
