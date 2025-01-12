import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

// eslint-disable-next-line react/prop-types
const DashNav = ({ className, ...props }) => {
	return (
		<nav
			className={cn("flex items-center space-x-4 lg:space-x-2", className)}
			{...props}
		>
			<Link
				to="/dashboard"
				className="text-sm font-medium transition-colors hover:text-primary"
			>
				Overview
			</Link>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						variant="link"
						className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:no-underline"
					>
						Settings
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Profile Settings</AlertDialogTitle>
						<AlertDialogDescription>
							This component was a stretch goal for us. The user will be able to
							update their email, change their password and delete their account
							here.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Close</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</nav>
	)
}

export default DashNav
