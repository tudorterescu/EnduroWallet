import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import "./index.css"
import { AuthProvider } from "./contexts/AuthContext"

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
	<BrowserRouter>
		<AuthProvider>
			<App />
		</AuthProvider>
	</BrowserRouter>,
	document.getElementById("root")
)
