import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth"
import { Timestamp, doc, setDoc } from "firebase/firestore"

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password).then(
			(userCredential) => {
				// sucessfully created the user
				const user = userCredential.user

				// create a reference to the user document in Firestore
				const userDocRef = doc(db, "users", user.uid)

				// create a user document in firestore
				return setDoc(userDocRef, {
					userId: user.uid,
					email: user.email,
					createdAt: Timestamp.fromDate(new Date()),
				})
			}
		)
	}

	function signin(email, password) {
		return signInWithEmailAndPassword(auth, email, password)
	}

	function logout() {
		return signOut(auth)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setLoading(false)
		})

		// Cleanup the listener on component unmount
		return unsubscribe
	}, [])

	const value = {
		currentUser,
		signup,
		signin,
		logout,
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
