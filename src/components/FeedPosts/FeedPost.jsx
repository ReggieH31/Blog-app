import { Box, Flex, Image, Text } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
	const { userProfile } = useGetUserProfileById(post.createdBy);

	return (
		<>
			<PostHeader post={post} creatorProfile={userProfile} />
      <Flex my={2} borderRadius={4} overflow={"hidden"} position="relative">
        <Image src={post.imageURL} alt={"FEED POST IMG"} w={"100%"} h={"100%"} objectFit={"cover"} />

        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {/* Display Post Context */}
       
        </Flex>
      </Flex>
      <PostFooter post={post} creatorProfile={userProfile} />
		</>
	);
};

export default FeedPost;
