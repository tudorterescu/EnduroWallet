import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyBP8EVQIg2KqXF27egLReqlNuJYLof3v9U",
	authDomain: "groupproject-439c2.firebaseapp.com",
	projectId: "groupproject-439c2",
	storageBucket: "groupproject-439c2.appspot.com",
	messagingSenderId: "648536677443",
	appId: "1:648536677443:web:4e5006c6eb53a188f4c8f6",
	measurementId: "G-H169XZCEP2",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
