import React, { useEffect, useState } from "react";
import { Box, Link, Tooltip, Text } from "@chakra-ui/react";
import { NotificationsLogo } from "../../assets/constants";
import { Link as RouterLink } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const Notifications = () => {
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const userId = getCurrentUserId(); // Implement a function to get the current user's ID
                const q = query(collection(firestore, "notifications"), where("recipientId", "==", userId));
                const querySnapshot = await getDocs(q);
                setNotificationCount(querySnapshot.size);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <Tooltip
            hasArrow
            label={"Notifications"}
            placement='right'
            ml={1}
            openDelay={500}
            display={{ base: "block", md: "none" }}
        >
            <Link
                display={"flex"}
                to={"/Notifications"}
                as={RouterLink}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
            >
                <NotificationsLogo />
                <Box display={{ base: "none", md: "block" }}>Notifications</Box>
                {notificationCount > 0 && (
                    <Box ml={2}>
                        <Text fontSize="xs" fontWeight="bold" color="red.400">
                            {notificationCount}
                        </Text>
                    </Box>
                )}
            </Link>
        </Tooltip>
    );
};

export default Notifications;
