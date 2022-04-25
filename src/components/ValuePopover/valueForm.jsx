import { Button, ButtonGroup, IconButton, Stack, useToast } from '@chakra-ui/react'
import MyToast from 'components/myToast'
import { useAuth } from 'context/authContext'
import React from 'react'
import MyInput from './valueInput'
import { FcCheckmark } from 'react-icons/fc'
import { IoMdClose } from 'react-icons/io'

function ValueForm({ onCancel, whatPopover }) {
    const toast = useToast()
    const { setUserInitialValue, userInitialValue, updateData } = useAuth()

    const validateInicialValue = () => {
        if (userInitialValue === 0 || userInitialValue < 0) {
            MyToast(toast, 'Valor inválido', 'error')
            return
        }
        updateData()
        onCancel()
    }

    switch (whatPopover) {
        case 'mobile':
            return (
                <Stack spacing={5}>
                    <MyInput
                        label="Definir valor da sua carteira:"
                        id="first-name"
                        placeholder="$ X,XX"
                        onChange={(e) => setUserInitialValue(e.target.value)}
                    />
                    <ButtonGroup d="flex" justifyContent="space-around">
                        <IconButton
                            icon={<IoMdClose size={35} color="red" />}
                            colorScheme="blackAlpha"
                            size="lg"
                            isRound
                            onClick={onCancel}
                            border="2px solid red"
                        />
                        <IconButton
                            icon={<FcCheckmark size={30} />}
                            colorScheme="blackAlpha"
                            size="lg"
                            isRound
                            onClick={validateInicialValue}
                            border="2px solid green"
                        />
                    </ButtonGroup>
                </Stack>
            )
        case 'desktop':
            return (
                <Stack spacing={5}>
                    <MyInput
                        label="Definir valor da sua carteira:"
                        id="first-name"
                        placeholder="$ X,XX"
                        onChange={(e) => setUserInitialValue(e.target.value)}
                    />
                    <ButtonGroup d="flex" justifyContent="flex-end">
                        <Button colorScheme="red" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button onClick={validateInicialValue} colorScheme="green">
                            Save
                        </Button>
                    </ButtonGroup>
                </Stack>
            )
        default:
            break
    }
}

export default ValueForm
