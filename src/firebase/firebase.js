import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDFZxA3kJYr2SoHWnhREJyOmPE1lXfbz24",
	authDomain: "secondhand-453b5.firebaseapp.com",
	databaseURL: "https://secondhand-453b5-default-rtdb.firebaseio.com",
	projectId: "secondhand-453b5",
	storageBucket: "secondhand-453b5.appspot.com",
	messagingSenderId: "14237004762",
	appId: "1:14237004762:web:da7460ef9b27c5fc07c6e3",
	measurementId: "G-B1L5KSFPPY"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export const db = getFirestore()

export { app, auth, firestore, storage };
