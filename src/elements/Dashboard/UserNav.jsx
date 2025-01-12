import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const UserNav = () => {
	const { currentUser, logout } = useAuth()
	const navigate = useNavigate()

	const handleLogout = async () => {
		try {
			await logout()
			navigate("/")
		} catch (error) {
			// Handle any errors that occur during logout
			console.error("Failed to log out:", error)
		}
	}

	const userName = currentUser?.email.split("@")[0] // Extract the part before '@'
	const userEmail = currentUser?.email

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src="/avatars/01.png" alt="@mrbean2" />
						<AvatarFallback>
							{userName?.substring(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{userName}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{userEmail}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={handleLogout}>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserNav
