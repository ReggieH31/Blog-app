import React, { useState } from "react";
import { Box, Container, Text, VStack, Input, InputGroup, InputRightElement, Button, Select, Skeleton } from "@chakra-ui/react";
import FeedPost from "./FeedPost";

import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import useSearchUsersPosts from "../../hooks/useSearchUsersPosts";

const FeedPosts = () => {
	const { isLoading: feedLoading, posts: feedPosts } = useGetFeedPosts();
	const { isLoading: searchLoading, posts: searchPosts, getPostDetails } = useSearchUsersPosts();
	// const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	// const [selectedCondition, setSelectedCondition] = useState('');

	const handleSearchPost = (e) => {
		e.preventDefault();
		getPostDetails(selectedCategory);
	};

	return (
		<Container maxW={"container.sm"} py={10} px={2}>
			<Box mb={4}>
				<InputGroup size="md">

					<Select
						pr="4.5rem"
						placeholder="Category"
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
					>
						<option value="Apparel">Apparel</option>
						<option value="Appliances">Appliances</option>
						<option value="Electronics">Electronics</option>
						<option value="Furniture">Furniture</option>
						<option value="Home Goods">Home Goods</option>
						<option value="Jewelry">Jewelry</option>
						<option value="Sporting Goods">Sporting Goods</option>
						<option value="Textbooks">Textbooks</option>
					</Select>

					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={handleSearchPost}>
							Search
						</Button>
					</InputRightElement>
				</InputGroup>
			</Box>

			{(feedLoading || searchLoading) ?
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
						<Skeleton height='10px' w={"200px"} />
						<Skeleton height='10px' w={"200px"} />                    </VStack>
				)) :
				searchPosts.length > 0 ? searchPosts.map((post) => <FeedPost key={post.id} post={post} />) :
					feedPosts.length > 0 ? feedPosts.map((post) => <FeedPost key={post.id} post={post} />) :
						<Text fontSize={"md"} color={"red.400"}>Add friends to see posts....</Text>
			}
		</Container>
	);
};

export default FeedPosts;


/*

selectedCondition for getPostDetails

<Select
						pr="4.5rem"
						placeholder="Condition"
						value={selectedCondition}
						onChange={(e) => setSelectedCondition(e.target.value)}
					>
						<option value="New">New</option>
						<option value="Good">Good</option>
						<option value="Fair">Fair</option>
						<option value="Poor">Poor</option>
					</Select>



*/