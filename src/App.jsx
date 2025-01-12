import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

// import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import SignInPage from "./pages/SignInPage"

import ProtectedRoute from "./ProtectedRoute"

const App = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Routes>
				<Route exact path="/" element={<SignInPage />} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
			</Routes>
			<Toaster />
		</ThemeProvider>
	)
}

export default App
