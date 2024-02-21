import { Box, Flex, VStack, Input, Button, Text, Avatar, SkeletonCircle, Skeleton, Link } from '@chakra-ui/react';
import React, { useState } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleMessageSend = () => {
    if (inputValue.trim() !== '') {
      const now = new Date();
      const hours = (now.getHours() % 12 || 12).toString().padStart(2, '0'); // Convert to 12-hour format
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      const timestamp = `${hours}:${minutes} ${ampm}`;
      
      const newMessage = {
        content: inputValue,
        timestamp: timestamp
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };
  

  return (
    <Flex>
      {/* Left side */}
      <Box
        height={"100vh"}
        borderRight={"1px solid"}
        borderColor={"whiteAlpha.300"}
        py={8}
        position={"sticky"}
        top={0}
        left={0}
        px={{ base: 2, md: 4 }}
        flex={1} // Take up remaining space
      >
        <Flex direction={"column"} align="stretch">
          <VStack spacing={4} align="stretch">
            {/* Sample message */}
            <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
              <Flex alignItems={"center"} gap={2}>
                {/* Replace with actual sender profile picture and username */}
                <Avatar src={'path_to_sender_profile_pic'} alt='user profile pic' size={"sm"} />
                <Link to={'path_to_sender_profile'}>Username</Link>
              </Flex>
              <Box color={"gray.500"}>today</Box>
            </Flex>


          </VStack>
        </Flex>
      </Box>
      
      {/* Right side */}
      <Box
        height={"100vh"}
        py={8}
        px={{ base: 2, md: 4 }}
        flex={1} // Take up remaining space
        display="flex"
        flexDirection="column"
        justifyContent="space-between" // Align items with space between
      >
        {/* Chat messages */}
        <VStack spacing={2} align="stretch">
          {messages.map((message, index) => (
            <Box key={index} textAlign="right">
              <Flex direction="column" align="flex-end">
                <Text bg="blue.500" color="white" p={2} borderRadius="md" maxWidth="70%">
                  {message.content}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {message.timestamp}
                </Text>
              </Flex>
            </Box>
          ))}
        </VStack>

        {/* Input field and send button */}
        <Flex align="center">
          <Input
            flex={1}
            mr={2}
            placeholder="Type your message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleMessageSend();
            }}
          />
          <Button colorScheme="blue" onClick={handleMessageSend}>Send</Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChatPage;