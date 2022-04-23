import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button
} from '@chakra-ui/react'
import { useAuth } from 'context/authContext'
import { DeletePokemons } from 'functions/deletePokemons'
import React from 'react'

export default function AlertSale(props) {
    const { pokemonList, setPokemonHistory, bitcoinValue, setUserInitialValue, userInitialValue } = useAuth()
    const cancelRef = React.useRef()

    function deletePokemon() {
        props.onClose()
        DeletePokemons(
            props.pokeNameSell,
            pokemonList,
            setPokemonHistory,
            bitcoinValue,
            setUserInitialValue,
            userInitialValue
        )
    }
    
    return (
        <>
            <AlertDialog
                isOpen={props.isOpen}
                leastDestructiveRef={cancelRef}
                onClose={props.onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader
                            fontSize="lg"
                            fontWeight="bold"
                        >
                            Vender Pokemon
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Tem certeza que deseja vender seu{' '}
                            {props.pokeNameSell.name}?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                onClick={props.onClose}
                            >
                                Cancelar
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={deletePokemon}
                                ml={3}
                            >
                                Vender
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
