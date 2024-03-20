import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where, startAfter, endBefore } from "firebase/firestore"; // Add startAfter and endBefore for pagination
import { firestore } from "../firebase/firebase";

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const showToast = useShowToast();

    const getUserProfile = async (username) => {
        setIsLoading(true);
        setUser(null);
        try {
            // Modify the query to support wildcard pattern matching
            const q = query(collection(firestore, "users"), where("username", ">=", username), where("username", "<=", username + "\uf8ff"));

            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) return showToast("Error", "User not found", "error");

            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (error) {
            showToast("Error", error.message, "error");
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
