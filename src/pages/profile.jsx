import { Flex, Image } from '@chakra-ui/react'
import Header from 'components/header'
import { useAuth } from 'context/authContext'
import React from 'react'

const Profile = () => {
    const {user} = useAuth()
    return (
        <Flex w="100%" h="100vh" direction="column">
            <Header />
            <Flex h="7%" />
            <Flex
                w="100%"
                h="93%"
                bg="defaultColor.400"
                display={{ md: 'flex' }}
                justifyContent="center"
            >
                <Flex
                    w={{ base: 'full', md: '70%' }}
                    h="100%"
                    bg="defaultColor.500"
                    justifyContent="center"
                    padding={10}
                >
                    <Image
                        borderRadius="full"
                        boxSize="200px"
                        src={user.photoURL}
                        alt={user.displayName}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Profile
