import { useRef, useState } from "react";
import {
	Box,
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	Tooltip,
	useDisclosure,
	Text, // Add Text component for rendering privacy policy
} from "@chakra-ui/react";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { AiFillPhone } from "react-icons/ai";

import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
	const form = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const sendEmail = async (e) => {
		e.preventDefault();

		const data = {
			name: name,
			email: email,
			subject: subject,
			message: message
		};

		try {
			await fetch('/sendEmail', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			toast.success("Message sent successfully");
		} catch (error) {
			toast.error(error.message);
		}

		// Reset form fields after submission
		setName("");
		setEmail("");
		setSubject("");
		setMessage("");

		onClose();
	};

	console.log(Contact);
	return (
		<>
			<Tooltip
				hasArrow
				label={"Contact"}
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
					<AiFillPhone size={25} />
					<Box>Contact</Box>
				</Flex>
			</Tooltip>

			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Contact Us</ModalHeader>
					<ModalBody pb={6}>
						<form ref={form} onSubmit={sendEmail}>
							<Textarea
								type="text"
								name="user_name"
								placeholder="Full Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>

							<Textarea
								mt={4}
								type="email"
								name="user_email"
								placeholder="Your active email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<Textarea
								mt={4}
								type="text"
								name="subject"
								placeholder="Subject"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
								required
							/>
							<Textarea
								mt={4}
								type="text"
								name="message"
								placeholder="Message"
								cols="30"
								rows="10"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								required
							/>
						</form>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={sendEmail}>
							Send Message
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
					<Text fontSize="sm" color="gray.500" p={6}>
						<strong>Privacy Policy</strong>
						<br />
						<br />
						Last Updated: January 28, 2024
						<br />
						<br />
						At Eco Exchange we are committed to protecting your privacy and informing you of the data that we get from you. Throughout this Privacy Policy is detailed information regarding your data and what Eco Exchange gathers, utilizes and shares when you visit Eco Exchange website, applications as well as mobile applications. The Privacy Policy link will be made available via all platforms that you access for us.
						<br />
						<br />
						<strong>Notice at Collection</strong>
						<br />
						We collect information that could be linked indirectly or directly to a user's personal information. The categories that we collect regarding your personal information include General Location Information, Personal identifiers, Demographic Information, Commercial Information, and Inferences. Why we collect the information is described in the section identified as the” Reason for Collection and Use.”
						<br />
						<br />
						<strong>Categories of Information We Collect </strong>
						<br />
						Personal Identifiers - Such as your name, email address, account credentials Commercial Information
						<br />
						Location Information - Location from IP address or data that points toward a city or postal code level.
						<br />
						Demographic Information - age, age range, birthday
						<br />
						Inferences - Personal information used to create a profile based on a consumer's preferences, predispositions, and characteristics.
						<br />
						<br />
						<strong>Your Rights</strong>
						<br />
						You have the right to access, correct, and delete your personal information. You also have the right to object to the processing of your personal information.
						<br />
						You as a consumer have the right to request correction of your personal information.
						<br />
						You have the right to exercise your rights.
						<br />
						You have the right to request a deletion of your personal information.
						<br />
						You have the right to be free from discrimination.
						<br />
						You have the right to object to the processing of your personal information.
						<br />
						<br />
						<strong>Protection of Information and Information Security </strong>
						<br />
						Eco Exchange seeks to protect your information and ensure your Personal Information via technical means are safe.
						The safety and security of your data is not always guaranteed and you share information on the site at your own risk.
						Do not use this service if you don't agree to the terms of this policy.
						<br />
						<br />
						<strong>Questions</strong>
						<br />
						If you have any questions regarding this Privacy Policy, please contact using the form above. We will respond to your inquiry as soon as possible.




					</Text>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Contact;
