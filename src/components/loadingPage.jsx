import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'

function LoadingPage() {
    return (
        <Center w="100%" h="100%">
            <Spinner size="xl" color="red.500" thickness='5px'/>
        </Center>
    )
}

export default LoadingPage
