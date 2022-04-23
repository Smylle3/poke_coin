import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'context/authContext'
import pokemonLogo from 'assets/logoImages/pokemonLogo.png'
import bitcoinLogo from 'assets/logoImages/bitcoinLogo.png'
import Options from './options'
import useMobile from 'functions/useMobile'
import ValuePopover from './ValuePopover/valuePopover'

export default function Header() {
    const { user, logOut, valuePokemonsUser, userInitialValue } = useAuth()
    const isMobile = useMobile()

    return (
        <Box
            w="100%"
            bg="defaultColor.500"
            color="defaultColor.400"
            h="7%"
            position="fixed"
            zIndex={999}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
            <Flex
                direction="row"
                h="100%"
                w="170px"
                minW="170px"
                alignItems="center"
                padding="5px 5px 5px 10px"
            >
                <Link to="/">
                    <Flex direction="row">
                        <Image h={10} alt="Pokemon" src={pokemonLogo} />
                        <Image h={9} alt="Bitcoin" src={bitcoinLogo} />
                    </Flex>
                </Link>
            </Flex>
            {isMobile ? (
                <Text>
                    Seu dinheiro: $ {(userInitialValue * 1).toFixed(2).replace('.', ',')}
                </Text>
            ) : (
                <Flex
                    w="30%"
                    minW="350px"
                    h="80%"
                    alignItems="center"
                    justifyContent="space-between"
                    borderRadius={7}
                    border="1px solid #fff"
                    padding="0px 15px"
                >
                    Valor em Pokémons: $ {valuePokemonsUser}
                    <Flex alignItems="center">
                        <ValuePopover />
                    </Flex>
                </Flex>
            )}
            <Flex padding="0px 10px 0px 10px">
                <Options isMobile={isMobile} user={user} logOut={logOut} />
            </Flex>
        </Box>
    )
}
