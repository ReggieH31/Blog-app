import React, { useState } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Select,
    useDisclosure,
} from "@chakra-ui/react";
import useSearchUsersPosts from "../../hooks/useSearchUsersPosts";
import SuggestedPost from "../SuggestedPosts/SuggestedPost";

const Search = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { posts, isLoading, getPostDetails } = useSearchUsersPosts();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCondition, setSelectedCondition] = useState("");

    const handleSearchPost = (e) => {
        e.preventDefault();
        getPostDetails(selectedCategory, selectedCondition);
    };

    return (
        <>
            <Button onClick={onOpen} colorScheme="blue" size="sm">
                Search
            </Button>

            <Flex flexDirection="column" gap={4}>
                {isOpen && (
                    <Box>
                        <form onSubmit={handleSearchPost}>
                            <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    placeholder="Select category"
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                >
                                    {/* Options for categories */}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel mt={4}>Condition</FormLabel>
                                <Select
                                    placeholder="Select category"
                                    onChange={(e) =>
                                        setSelectedCondition(e.target.value)
                                    }
                                >
                                    {/* Options for conditions */}
                                </Select>
                            </FormControl>

                            <Button
                                type="submit"
                                ml={"auto"}
                                size={"sm"}
                                mt={4}
                                isLoading={isLoading}
                            >
                                Search
                            </Button>
                        </form>
                    </Box>
                )}

                {posts &&
                    posts.map((post, index) =>
                        index % 3 === 0 ? (
                            <SuggestedPost
                                key={post.id}
                                post={post}
                            />
                        ) : null
                    )}
            </Flex>
        </>
    );
};

export default Search;
