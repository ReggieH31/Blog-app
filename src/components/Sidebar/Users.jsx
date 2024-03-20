import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import { UsersLogo } from "../../assets/constants";
import useSearchUser from "../../hooks/useSearchUser";
import { useRef, useState } from "react";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const Users = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const searchRef = useRef(null);
    const { user, isLoading, getUserProfile, setUser } = useSearchUser();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSearchUser = async (e) => {
        e.preventDefault();
        setErrorMessage(null); // Clear previous error messages
        const username = searchRef.current.value.trim();

        if (!username) {
            setErrorMessage("Please enter a username");
            return;
        }

        try {
            await getUserProfile(username);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <Tooltip
                hasArrow
                label={"Users"}
                placement="right"
                ml={1}
                openDelay={500}
                display={{ base: "block", md: "none" }}
            >
                <Flex
                    alignItems="center"
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                    onClick={onOpen}
                >
                    <UsersLogo />
                    <Box display={{ base: "none", md: "block" }}>Users</Box>
                </Flex>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
                <ModalOverlay />
                <ModalContent bg="black" border="1px solid gray" maxW="400px">
                    <ModalHeader>Search user</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSearchUser}>
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input placeholder="asaprogrammer" ref={searchRef} />
                            </FormControl>

                            <Flex w="full" justifyContent="flex-end">
                                <Button type="submit" ml="auto" size="sm" my={4} isLoading={isLoading}>
                                    Search
                                </Button>
                            </Flex>
                        </form>
                        {errorMessage && (
                            <Box color="red" mt={2}>
                                {errorMessage}
                            </Box>
                        )}
                        {user && <SuggestedUser user={user} setUser={setUser} />}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Users;
