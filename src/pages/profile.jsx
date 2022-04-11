import React from 'react'
import { FaBtc, FaBackspace, FaArrowCircleDown } from 'react-icons/fa'
import {
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    useToast
} from '@chakra-ui/react'

import { useAuth } from 'context/auth'
import Orders from 'components/orders'
import History from 'components/history'
import pokemonLogo from 'assets/logoImages/pokemonLogo.png'
import bitcoinLogo from 'assets/logoImages/bitcoinLogo.png'
import SearchPokemons from 'functions/searchPokemons'

export default function Profile() {
    const {
        setPokemonList,
        pokemonName,
        setPokemonName,
        setPokemonHistory
    } = useAuth()
    const isError = pokemonName === ''
    const toast = useToast()

    function keyboardKey(event) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            if (pokemonName.length === 0) {
                toast({
                    title: 'Digite o nome do pokemon!',
                    status: 'error',
                    isClosable: true,
                    duration: 3000,
                    position: 'top-right',
                    variant: 'left-accent'
                })
            } else buyPokemon(event)
        }
    }

    function buyPokemon(event) {
        SearchPokemons(
            event,
            pokemonName,
            setPokemonName,
            setPokemonList,
            setPokemonHistory,
            toast
        )
    }

    return (
        <Flex w="100%" h="100vh" display={{ md: 'flex' }}>
            <Center
                w={{ base: 'full', md: 'mid' }}
                h="full"
                flexDirection="column"
                bg="defaultColor.600"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    margin={10}
                >
                    <Image h={100} alt="Pokemon" src={pokemonLogo} />
                    <Image h={90} alt="Bitcoin" src={bitcoinLogo} />
                </Stack>
                <Heading fontFamily="body" color="defaultColor.400">
                    HUB de Negociação
                </Heading>
                <FormControl
                    isRequired
                    isInvalid={isError}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    margin="40px 0px"
                >
                    <FormLabel
                        htmlFor="pokename"
                        color="defaultColor.400"
                    >
                        Comprar pokemon
                    </FormLabel>
                    <InputGroup
                        width="75%"
                        size="lg"
                        onKeyDown={(e) => keyboardKey(e)}
                    >
                        <Input
                            textTransform="lowercase"
                            onChange={(e) =>
                                setPokemonName(e.target.value)
                            }
                            value={pokemonName}
                            bg="defaultColor.400"
                            placeholder="Digite o nome do pokemon que deseja comprar."
                            id="pokename"
                            type="text"
                            margin="0px 0px 15px 0px"
                        />
                        <InputRightElement>
                            <IconButton
                                icon={
                                    <FaBackspace
                                        color="red"
                                        size={25}
                                    />
                                }
                                onClick={() => setPokemonName('')}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <Button
                        width="75%"
                        isDisabled={isError}
                        leftIcon={<FaBtc />}
                        colorScheme="green"
                        id="Compra"
                        onClick={(event) => buyPokemon(event)}
                    >
                        Comprar
                    </Button>
                </FormControl>
                <a href="#orders">
                    <IconButton
                        colorScheme="red"
                        icon={
                            <FaArrowCircleDown
                                size={40}
                                color="#f0f0f0"
                            />
                        }
                        isRound
                        display={{ md: 'none' }}
                    />
                </a>
            </Center>
            <Center
                id="orders"
                w={{ base: 'full', md: 'mid' }}
                h="100vh"
                flexDirection="column"
            >
                <Orders />
                <History />
            </Center>
        </Flex>
    )
}
