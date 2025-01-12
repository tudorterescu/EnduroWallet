// Components
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

// Forms
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// signin/signup imports
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const FormSchema = z.object({
	email: z.string().email({
		message: "Please provide a valid email address.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters long.",
	}),
})

const SignInPage = () => {
	const { toast } = useToast()
	const { signup } = useAuth()
	const { signin } = useAuth()
	const navigate = useNavigate()

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	async function handleSignup(data) {
		try {
			await signup(data.email, data.password)
			toast({
				title: "Success",
				description: "Account created successfully!",
			})
			navigate("/dashboard")
		} catch (error) {
			toast({
				title: "Error",
				description: error.message,
			})
		}
	}

	async function handleSignin(data) {
		try {
			await signin(data.email, data.password)
			toast({
				title: "Success",
				description: "Signed in successfully!",
			})
			navigate("/dashboard")
		} catch (error) {
			toast({
				title: "Error",
				description: error.message,
			})
			console.error(error)
		}
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<Tabs defaultValue="signin" className="w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="signin">Sign In</TabsTrigger>
					<TabsTrigger value="signup">Sign Up</TabsTrigger>
				</TabsList>
				<TabsContent value="signin">
					<Card>
						<CardHeader>
							<CardTitle>Sign In</CardTitle>
							<CardDescription>
								Welcome back to Enduro Wallet. Enter your details and click
								signin to continue.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(handleSignin)}
									className="w-full space-y-2"
								>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input placeholder="me@example.org" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input type="password" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button type="submit" className="w-full">
										Sign In
									</Button>
								</form>
							</Form>

							{/* Google signin */}
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-background px-2 text-muted-foreground">
										Or continue with
									</span>
								</div>
							</div>
							<Button
								variant="outline"
								className="flex items-center gap-2 justify-center w-full"
							>
								<img
									src="/src/assets/google_icon.svg"
									alt="Google Icon"
									className="w-4 h-4 dark:invert"
								/>
								Google
							</Button>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="signup">
					<Card>
						<CardHeader>
							<CardTitle>Sign Up</CardTitle>
							<CardDescription>
								Don&apos;t have an account? Use the form below to signup!
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(handleSignup)}
									className="w-full space-y-2"
								>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input placeholder="me@example.org" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input type="password" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button type="submit" className="w-full">
										Create account
									</Button>
								</form>
							</Form>

							{/* Google signin */}
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-background px-2 text-muted-foreground">
										Or signup with
									</span>
								</div>
							</div>
							<Button
								variant="outline"
								className="flex items-center gap-2 justify-center w-full"
							>
								<img
									src="/src/assets/google_icon.svg"
									alt="Google Icon"
									className="w-4 h-4 dark:invert"
								/>
								Google
							</Button>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default SignInPage
