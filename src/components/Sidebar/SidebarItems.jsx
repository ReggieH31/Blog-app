import CreatePost from "./CreatePost";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Contact from "./Contact";
import Users from "./Users";
import Message from "./Message";

const SidebarItems = () => {
	return (
		<>
			<Home />
			<Users />
			<Notifications />
			<CreatePost />
			<ProfileLink />
			<Contact />
			<Message />
		</>
	);
};

export default SidebarItems;
