import React from "react";
import { Box, Flex, Image, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import Search from "../Search/Search"; // Import the Search component
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Box as="nav" bg="light" px={4} py={2}>
            <Flex justifyContent="space-between" alignItems="center">
                <Link to="/">
                    <Image src="/logo.png" h={10} alt="Logo" />
                </Link>
                <Box>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" type="submit">
                                Search
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Box>
                <Flex gap={4}>
                    <Link to="/auth">
                        <Button colorScheme="blue" size="sm">
                            Login
                        </Button>
                    </Link>
                    <Link to="/auth">
                        <Button variant="outline" size="sm">
                            Signup
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;
