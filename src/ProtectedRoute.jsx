import { Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
	const { currentUser } = useAuth() // get the current user from auth context

	if (!currentUser) {
		// If there's no user, redirect to the signin page
		return <Navigate to="/" />
	}

	return children // If the user is authenticated, render the children components
}

export default ProtectedRoute
