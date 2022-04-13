import { Center, Flex, Heading } from '@chakra-ui/react'
import { useAuth } from 'context/authContext'
import React from 'react'
import MyTable from './myTable'

export default function History() {
    const { pokemonHistory } = useAuth()

    return (
        <Flex
            bg="defaultColor.500"
            h="mid"
            w="full"
            flexDirection="column"
            alignItems="flex-start"
            padding="20px 10px"
        >
            <Center marginBottom={5}>
                <Heading fontFamily="heading" color="defaultColor.400">
                    Histórico de compras
                </Heading>
            </Center>
            <MyTable
                Avatar={null}
                Nome={null}
                Action={null}
                Valor="Base Exp"
                BGColor="defaultColor.400"
                Color="defaultColor.500"
                Width="100%"
            />
            <Flex
                direction="column-reverse"
                overflowY="scroll"
                h="90%"
                w="100%"
                maxH="90%"
                margin="10px 0px"
            >
                {pokemonHistory.map((pokemon) => (
                    <Flex alignItems="center" key={pokemon.id}>
                        <MyTable
                            Avatar={pokemon.avatar}
                            Nome={pokemon.name}
                            Action={pokemon.action}
                            Valor={pokemon.exp}
                            Color="defaultColor.400"
                            Width="100%"
                        />
                    </Flex>
                ))}
            </Flex>
        </Flex>
    )
}
