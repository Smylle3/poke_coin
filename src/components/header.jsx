import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from 'context/authContext'

export default function Header() {
    const { user, logOut } = useAuth()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            await logOut()
            navigate('/login')
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Flex w="100%" bg="defaultColor.500" color="defaultColor.400">
            <Button onClick={handleLogOut} colorScheme="blue">
                <Link to={'/login'}>Login </Link>
            </Button>
            <Text>User Email: {user && user.email}</Text>
            <Button onClick={handleLogOut} colorScheme="blue">
                LogOut
            </Button>
        </Flex>
    )
}
