import {
    Link as LinkChakra,
    Avatar,
    Flex,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    useDisclosure
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
import { Link } from 'react-router-dom'
import AboutUs from './aboutUs'

function Options(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleLogOut = async () => {
        try {
            await props.logOut()
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
                                <MenuItem
                                    icon={<ImFileText2 />}
                                    onClick={onOpen}
                                >
                                    Sobre o App
                                </MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title="Perfil">
                                <Link to="/profile">
                                    <MenuItem icon={<ImUser />}>
                                        Minha conta
                                    </MenuItem>
                                </Link>
                                <MenuItem
                                    icon={<ImExit />}
                                    onClick={handleLogOut}
                                >
                                    Sair
                                </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                    <AboutUs
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                    />
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
                        onClick={onOpen}
                    />
                    <Menu>
                        <MenuButton>
                            <Avatar
                                name=""
                                w={10}
                                h={10}
                                margin="0px 0px 0px 15px"
                                src={props.user.photoURL}
                            />
                        </MenuButton>
                        <MenuList
                            border="2px solid #222224"
                            padding={2}
                        >
                            <Link to="/profile">
                                <MenuItem
                                    icon={<FaUserEdit />}
                                    color="defaultColor.500"
                                    border="2px solid #222224"
                                    borderRadius={5}
                                >
                                    Editar perfil
                                </MenuItem>
                            </Link>
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
                    <AboutUs
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                    />
                </Flex>
            )
        default:
            break
    }
}

export default Options
