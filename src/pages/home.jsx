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
    Input,
    InputGroup,
    useToast
} from '@chakra-ui/react'

import { useAuth } from 'context/authContext'
import Orders from 'components/orders'
import History from 'components/history'
import SearchPokemons from 'functions/searchPokemons'
import Header from 'components/header'
import MyToast from 'components/myToast'
import LoadingPage from 'components/loadingPage'
import ValueMobilePopover from 'components/ValueMobilePopover/valueMobilePopover'
import useMobile from 'functions/useMobile'

export default function Home() {
    const {
        setPokemonList,
        pokemonName,
        setPokemonName,
        setPokemonHistory,
        loading,
        userInitialValue,
        setUserInitialValue,
        bitcoinValue
    } = useAuth()
    const isError = pokemonName === ''
    const toast = useToast()
    const isMobile = useMobile()

    function keyboardKey(event) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            if (pokemonName.length === 0) {
                MyToast(toast, 'Digite o nome do pokemon!', 'error')
            } else {
                buyPokemon(event)
            }
        }
    }

    function buyPokemon(event) {
        if (userInitialValue === 0 || parseFloat(userInitialValue) < 0) {
            MyToast(toast, 'Adicione uma quantia à sua carteira', 'error')
            return
        }
        SearchPokemons(
            event,
            pokemonName.toLowerCase(),
            setPokemonName,
            setPokemonList,
            setPokemonHistory,
            toast,
            userInitialValue,
            setUserInitialValue,
            bitcoinValue
        )
    }

    return (
        <Flex w="100%" h="100vh" display="flex" direction="column">
            <Header />
            <Flex h="7%" />
            {loading ? (
                <LoadingPage />
            ) : (
                <Flex w="100%" h="93%" display={{ md: 'flex' }}>
                    <Center
                        w={{ base: 'full', md: 'mid' }}
                        h="full"
                        flexDirection="column"
                        bg="defaultColor.600"
                    >
                        <Heading fontFamily="body" color="defaultColor.400">
                            PokéCoin
                        </Heading>
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
                            <FormLabel htmlFor="pokename" color="defaultColor.400">
                                Comprar pokémon
                            </FormLabel>
                            <InputGroup
                                width="75%"
                                size="lg"
                                onKeyDown={(e) => keyboardKey(e)}
                            >
                                <Input
                                    textTransform="lowercase"
                                    onChange={(e) => setPokemonName(e.target.value)}
                                    value={pokemonName}
                                    bg="defaultColor.400"
                                    placeholder="Digite o nome do pokémon que deseja comprar."
                                    id="pokename"
                                    type="text"
                                    margin="0px 0px 15px 0px"
                                />
                                <IconButton
                                    zIndex={0}
                                    icon={<FaBackspace color="red" size={25} />}
                                    onClick={() => setPokemonName('')}
                                />
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
                                icon={<FaArrowCircleDown size={40} color="#f0f0f0" />}
                                isRound
                                display={{ md: 'none' }}
                            />
                        </a>
                    </Center>
                    <Center
                        id="orders"
                        w={{ base: 'full', md: 'mid' }}
                        h={{ base: '100%', md: '100%' }}
                        flexDirection="column"
                    >
                        <Orders />
                        <History />
                    </Center>
                    {isMobile ? (
                        <Flex position="fixed" bottom={8} right={8}>
                            <ValueMobilePopover />
                        </Flex>
                    ) : null}
                </Flex>
            )}
        </Flex>
    )
}
