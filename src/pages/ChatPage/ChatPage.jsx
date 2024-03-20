import { Box, Flex, VStack, Input, Button, Text, Avatar } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Add this line to import Link
import { useLocation } from 'react-router-dom'; // Add this line to import useLocation
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; // Update the import path

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [senderUsername, setSenderUsername] = useState('');
  const [senderProfilePic, setSenderProfilePic] = useState('');
  
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const username = params.get('username');
    const profilePic = params.get('profilePic');

    setSenderUsername(username);
    setSenderProfilePic(profilePic);
  }, [location]);

  // Function to send a message and store it in Firebase Firestore
  const sendMessage = async () => {
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

      try {
        // Add the message to Firebase Firestore
        const docRef = await addDoc(collection(db, 'messages'), {
          content: newMessage.content,
          timestamp: serverTimestamp()
        });

        console.log('Message written with ID: ', docRef.id);

        // Update the local state with the new message
        setMessages([...messages, newMessage]);
        setInputValue('');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
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
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <Button colorScheme="blue" onClick={sendMessage}>Send</Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChatPage;


