import React, { useEffect, useState } from 'react'
import { Avatar, Button, Flex, IconButton, Text, useToast } from '@chakra-ui/react'
import { MdPhotoCamera, MdOutlineClear } from 'react-icons/md'
import { FcCheckmark } from 'react-icons/fc'
import { useAuth } from 'context/authContext'
import MyToast from './myToast'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from 'config/firebaseConfig'
import loadingGif from 'assets/loading.gif'

const PersonalAvatar = () => {
    const { user, updateAvatar } = useAuth()
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [urlImage, setUrlImage] = useState(user.photoURL)
    const [fileSelect, setFileSelect] = useState(null)

    useEffect(() => {
        setUrlImage(user.photoURL)
    }, [user.photoURL])

    function verifyFiles(event) {
        event.preventDefault()
        if (event.target.files[0]) {
            setFileSelect(event.target.files[0])
        }
    }

    async function uploadPhotos(event) {
        const file = event
        if (!file) {
            console.log('sem files')
            return
        }

        const fileExt = file.name.split('.').pop()
        const fileName = `${user.uid}.${fileExt}`
        uploadPhoto(file, fileName)
    }

    const uploadPhoto = (file, fileName) => {
        const storageRef = ref(storage, `/avatars/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                prog < 100 ? setLoading(true) : setLoading(false)
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUrlImage(url)
                    updateAvatar(url)
                    MyToast(toast, 'Foto de perfil atualizada!', 'success')
                    setLoading(false)
                })
            }
        )
    }

    return (
        <>
            <Avatar
                bg="transparent"
                borderRadius="full"
                boxSize="200px"
                src={loading || urlImage === undefined ? loadingGif : urlImage}
                alt={user.displayName}
                margin="0px 0px 30px 0px"
            />
            {!fileSelect ? (
                <>
                    <Button
                        margin="0px 0px 20px 0px"
                        variant="outline"
                        color="defaultColor.400"
                        colorScheme="blackAlpha"
                        rightIcon={<MdPhotoCamera />}
                        cursor="pointer"
                    >
                        <label htmlFor="single">Mudar foto de perfil</label>
                    </Button>
                    <input
                        style={{
                            visibility: 'hidden',
                            position: 'absolute'
                        }}
                        type="file"
                        id="single"
                        accept="image/*"
                        onChange={(e) => {
                            setLoading(true)
                            verifyFiles(e)
                        }}
                    />
                </>
            ) : (
                <>
                    <Text color="white">{fileSelect.name}</Text>
                    <Flex margin="10px 0px 20px 0px">
                        <IconButton
                            isRound
                            variant="link"
                            colorScheme="green"
                            aria-label="Send"
                            color="defaultColor.400"
                            icon={<FcCheckmark size={20} />}
                            cursor="pointer"
                            onClick={() => {
                                uploadPhotos(fileSelect)
                                setFileSelect(null)
                            }}
                        />
                        <IconButton
                            isRound
                            variant="link"
                            colorScheme="pink"
                            arial-label="Erease"
                            icon={<MdOutlineClear size={20} />}
                            onClick={() => {
                                setLoading(false)
                                setFileSelect(null)
                            }}
                        />
                    </Flex>
                </>
            )}
        </>
    )
}

export default PersonalAvatar
