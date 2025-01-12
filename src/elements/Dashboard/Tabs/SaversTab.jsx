import { Button } from "@/components/ui/button"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

// Form
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Tooltip, PieChart, Pie } from "recharts"

import { CircleDollarSign } from "lucide-react"
import { ListOrdered } from "lucide-react"
import { Landmark } from "lucide-react"

// firebase query imports
import { useEffect, useState } from "react"
import { collection, getDocs, doc, setDoc } from "firebase/firestore"
import { db } from "../../../firebase"
import { useAuth } from "../../../contexts/AuthContext"

const FormSchema = z.object({
	saverGoal: z
		.number()
		.transform((value) => parseFloat(value))
		.refine((value) => !isNaN(value) && value > 0, {
			message: "Saver goal must be a positive number.",
		}),
	saverAmount: z
		.number()
		.transform((value) => parseFloat(value))
		.refine((value) => !isNaN(value) && value > 0, {
			message: "Saver goal must be a positive number.",
		}),
	saverName: z
		.string()
		.min(2, { message: "Saver name must be at least 2 characters." }),
})

const SaversTab = () => {
	const { currentUser } = useAuth()
	const [savers, setSavers] = useState([])

	useEffect(() => {
		const fetchSavers = async () => {
			try {
				// Pointing to the subcollection of transactions for the specific user
				const saverRef = collection(db, "users", currentUser.uid, "savers")
				const querySnapshot = await getDocs(saverRef)
				const fetchedSavers = []
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					const data = doc.data()
					fetchedSavers.push({
						...data,
						saverId: data.saverId,
					})
				})
				setSavers(fetchedSavers)
			} catch (error) {
				console.error("Error fetching savers: ", error)
			}
		}

		if (currentUser) {
			fetchSavers()
		}
	}, [currentUser])

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			saverName: "",
			saverGoal: "",
			saverAmount: "",
		},
	})

	const { toast } = useToast()
	const [chartValue, setChartValue] = useState("saverAmount")

	// Handle chart change
	const handleChartChange = (value) => {
		setChartValue(value)
	}

	const onSubmit = async (data) => {
		try {
			// Create a new document reference with an auto-generated ID
			const newSaverRef = doc(
				collection(db, "users", currentUser.uid, "savers")
			)

			// Set the data for the new document
			await setDoc(newSaverRef, {
				saverId: newSaverRef.id, // Use the auto-generated ID as the transaction ID
				saverGoal: data.saverGoal,
				saverAmount: data.saverAmount,
				saverName: data.saverName,
			})

			// Update the transactions state to include the new transaction
			setSavers((prevSavers) => [
				...prevSavers,
				{
					saverId: newSaverRef.id,
					saverGoal: data.saverGoal,
					saverAmount: data.saverAmount,
					saverName: data.saverName,
				},
			])

			console.log("Saver added successfully!")
			toast({
				title: "Success",
				description: "Saver added successfully!",
				status: "success",
			})
		} catch (error) {
			console.error("Error adding saver: ", error)
			toast({
				title: "Error",
				description: `Error adding saver: ${error.message}`,
				status: "error",
			})
		}
	}

	return (
		<div className="flex flex-row items-stretch space-x-5">
			<Card className="basis-1/3 overflow-hidden">
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<span>Saver Breakdown</span>
						<CircleDollarSign className="text-muted-foreground" />
					</CardTitle>
					<CardDescription>
						<span>
							Below is visual representation of the money in your savers.
						</span>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<PieChart width={500} height={300} key={chartValue}>
						<Pie
							dataKey={chartValue}
							isAnimationActive={false}
							data={savers}
							cx="50%"
							cy="50%"
							outerRadius={80}
							fill="#a26df9"
							nameKey="saverName"
							label
						/>
						<Tooltip />
					</PieChart>
				</CardContent>
				<CardFooter>
					<span>Change between saver amount and saver goals here.</span>
					<Select
						onValueChange={(value) => {
							handleChartChange(value)
						}}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Values</SelectLabel>
								<SelectItem value="saverGoal">Goals</SelectItem>
								<SelectItem value="saverAmount">Amounts</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</CardFooter>
			</Card>
			<Card className="basis-1/3">
				<CardHeader>
					<CardTitle className="flex flex-row items-center justify-between">
						<span className="text-muted-foreground">Saver List</span>
						<ListOrdered />
					</CardTitle>
					<CardDescription>A list of all your savers.</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[400px]">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">Saver ID</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Goal</TableHead>
									<TableHead className="text-right">Amount</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{savers.map((saver) => (
									<TableRow key={saver.saverId}>
										<TableCell className="font-medium">
											{saver.saverId}
										</TableCell>
										<TableCell>{saver.saverName}</TableCell>
										<TableCell>{saver.saverGoal}</TableCell>
										<TableCell className="text-right">
											${saver.saverAmount}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</ScrollArea>
				</CardContent>
			</Card>
			<Card className="basis-1/3">
				<CardHeader>
					<CardTitle className="flex flex-row items-center justify-between">
						<span>Add Savers</span>
						<Landmark className="text-muted-foreground" />
					</CardTitle>
					<CardDescription>
						Use this section to add savers to your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full space-y-2"
						>
							<FormField
								control={form.control}
								name="saverName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="Saver name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="saverGoal"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Saver Goal</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Enter value"
												value={field.value}
												onChange={(e) => {
													const value = e.target.value
													if (value === "") {
														field.onChange(1)
													} else {
														const numericValue = parseFloat(value)
														field.onChange(
															isNaN(numericValue) ? "" : numericValue
														)
													}
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="saverAmount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Saver Amount</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Enter value"
												value={field.value}
												onChange={(e) => {
													const value = e.target.value
													if (value === "") {
														field.onChange(1)
													} else {
														const numericValue = parseFloat(value)
														field.onChange(
															isNaN(numericValue) ? "" : numericValue
														)
													}
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full">
								Add saver
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}

export default SaversTab
