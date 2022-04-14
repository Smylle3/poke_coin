import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'context/authContext'
import pokemonLogo from 'assets/logoImages/pokemonLogo.png'
import bitcoinLogo from 'assets/logoImages/bitcoinLogo.png'
import Options from './options'
import useMobile from 'utils/useMobile'

export default function Header() {
    const { user } = useAuth()
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
                w="160px"
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
            <Text>Olá {user.displayName}!</Text>
            <Flex padding="0px 10px 0px 0px">
                <Options isMobile={isMobile} />
            </Flex>
        </Box>
    )
}
