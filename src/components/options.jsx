import {
    Avatar,
    Flex,
    Icon,
    IconButton,
    Link as LinkChakra,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList
} from '@chakra-ui/react'
import React from 'react'
import {
    ImGithub,
    ImLinkedin,
    ImLinkedin2,
    ImUser,
    ImExit,
    ImFileText2
} from 'react-icons/im'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaUserEdit } from 'react-icons/fa'
import { useAuth } from 'context/authContext'
import { Link, Navigate } from 'react-router-dom'

function Options(props) {
    const { user, logOut } = useAuth()

    const handleLogOut = async () => {
        try {
            await logOut()
            Navigate('/login')
        } catch (error) {
            console.log(error.message)
        }
    }

    switch (props.isMobile) {
        case true:
            return (
                <Flex padding="7px 10px 0px 0px">
                    <Menu colorScheme="blackAlpha">
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<GiHamburgerMenu size={30} />}
                            variant=""
                        />
                        <MenuList
                            border="2px solid #222224"
                            color="defaultColor.500"
                        >
                            <MenuGroup title="Social">
                                <LinkChakra
                                    href="https://www.linkedin.com/in/jo%C3%A3o-pedro-smylle/"
                                    isExternal
                                >
                                    <MenuItem icon={<ImLinkedin />}>
                                        LinkedIn do Dev
                                    </MenuItem>
                                </LinkChakra>
                                <LinkChakra
                                    href="https://github.com/Smylle3/poke_coin"
                                    isExternal
                                >
                                    <MenuItem icon={<ImGithub />}>
                                        Repositório do App
                                    </MenuItem>
                                </LinkChakra>
                                <MenuItem icon={<ImFileText2 />}>
                                    Sobre o App
                                </MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title="Perfil">
                                <MenuItem icon={<ImUser />}>
                                    <Link to="/">Minha conta</Link>
                                </MenuItem>
                                <MenuItem
                                    icon={<ImExit />}
                                    onClick={handleLogOut}
                                >
                                    Sair
                                </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </Flex>
            )
        case false:
            return (
                <Flex direction="row" align="center">
                    <LinkChakra
                        href="https://www.linkedin.com/in/jo%C3%A3o-pedro-smylle/"
                        isExternal
                    >
                        <Icon
                            as={ImLinkedin2}
                            w={9}
                            h={9}
                            margin="0px 0px 0px 15px"
                        />
                    </LinkChakra>
                    <LinkChakra
                        href="https://github.com/Smylle3/poke_coin"
                        isExternal
                    >
                        <Icon
                            as={ImGithub}
                            w={10}
                            h={10}
                            margin="0px 0px 0px 15px"
                        />
                    </LinkChakra>

                    <Icon
                        as={ImFileText2}
                        w={9}
                        h={9}
                        margin="0px 0px 0px 15px"
                    />
                    <Link to="/">
                        <Menu>
                            <MenuButton>
                                <Avatar
                                    name=""
                                    w={10}
                                    h={10}
                                    margin="0px 0px 0px 15px"
                                    src={user.photoURL}
                                />
                            </MenuButton>
                            <MenuList
                                border="2px solid #222224"
                                padding={2}
                            >
                                <MenuItem
                                    icon={<FaUserEdit />}
                                    color="defaultColor.500"
                                    border="2px solid #222224"
                                    borderRadius={5}
                                >
                                    Editar perfil
                                </MenuItem>
                                <MenuItem
                                    icon={<ImExit />}
                                    marginTop={2}
                                    color="defaultColor.600"
                                    onClick={handleLogOut}
                                    border="2px solid #222224"
                                    borderRadius={5}
                                >
                                    Sair
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Link>
                </Flex>
            )
        default:
            break
    }
}

export default Options
