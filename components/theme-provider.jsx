import { createContext, useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"

const ThemeProviderContext = createContext({
	theme: "system",
	setTheme: () => null,
})

function ThemeProvider({ children, defaultTheme, storageKey, ...props }) {
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem(storageKey) || defaultTheme
	})

	useEffect(() => {
		const root = window.document.documentElement

		root.classList.remove("light", "dark")

		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light"

			root.classList.add(systemTheme)
			return
		}

		root.classList.add(theme)
	}, [theme])

	const value = {
		theme,
		setTheme: (newTheme) => {
			localStorage.setItem(storageKey, newTheme)
			setTheme(newTheme)
		},
	}

	return (
		<ThemeProviderContext.Provider value={value} {...props}>
			{children}
		</ThemeProviderContext.Provider>
	)
}

ThemeProvider.propTypes = {
	children: PropTypes.node.isRequired,
	defaultTheme: PropTypes.oneOf(["system", "dark", "light"]),
	storageKey: PropTypes.string,
}

ThemeProvider.defaultProps = {
	defaultTheme: "system",
	storageKey: "vite-ui-theme",
}

const useTheme = () => {
	const context = useContext(ThemeProviderContext)

	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}

	return context
}

export { ThemeProvider, useTheme }
