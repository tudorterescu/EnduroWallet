import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
	Card,
	CardContent,
	CardTitle,
	CardDescription,
	CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

import { Bitcoin, Receipt } from "lucide-react"

// firebase query imports
import { db } from "../../../firebase"
import { useAuth } from "../../../contexts/AuthContext"
import { doc, setDoc, collection, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z.object({
	incomeAmount: z
		.number()
		.transform((value) => parseFloat(value))
		.refine((value) => !isNaN(value) && value > 0, {
			message: "Transaction value must be a positive number.",
		}),
	incomeMonth: z.string().min(1, {
		message: "Please select an income month.",
	}),
	incomeYear: z.string().min(4, {
		message: "Please enter a valid year.",
	}),
})

const IncomeTab = () => {
	const { currentUser } = useAuth()
	const [income, setIncome] = useState([])
	const { toast } = useToast()

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			incomeAmount: "",
			incomeYear: "",
			incomeMonth: "",
		},
	})

	useEffect(() => {
		const fetchIncome = async () => {
			try {
				// Pointing to the subcollection of transactions for the specific user
				const incomeRef = collection(db, "users", currentUser.uid, "income")
				const querySnapshot = await getDocs(incomeRef)
				const fetchedIncome = []
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					const data = doc.data()
					fetchedIncome.push({
						...data,
						incomeId: data.incomeId,
					})
				})
				setIncome(fetchedIncome)
			} catch (error) {
				console.error("Error fetching income: ", error)
			}
		}

		if (currentUser) {
			fetchIncome()
		}
	}, [currentUser])

	const capitalizeFirstLetter = (string) => {
		return string ? string.charAt(0).toUpperCase() + string.slice(1) : ""
	}

	const onSubmit = async (data) => {
		try {
			// Create a new document reference with an auto-generated ID
			const newIncomeRef = doc(
				collection(db, "users", currentUser.uid, "income")
			)

			// Set the data for the new document
			await setDoc(newIncomeRef, {
				incomeId: newIncomeRef.id, // Use the auto-generated ID as the transaction ID
				incomeAmount: data.incomeAmount,
				incomeYear: data.incomeYear,
				incomeMonth: data.incomeMonth,
			})

			// Update the transactions state to include the new transaction
			setIncome((prevIncome) => [
				...prevIncome,
				{
					incomeId: newIncomeRef.id,
					incomeAmount: data.incomeAmount,
					transactionCategory: data.transactionCategory,
					incomeYear: data.incomeYear,
					incomeMonth: data.incomeMonth,
				},
			])

			console.log("Income added successfully!")
			toast({
				title: "Success",
				description: "Income added successfully!",
				status: "success",
			})
		} catch (error) {
			console.error("Error adding income: ", error)
			toast({
				title: "Error",
				description: `Error adding income: ${error.message}`,
				status: "error",
			})
		}
	}

	return (
		<div className="flex flex-row space-x-5 items-stretch">
			<Card className="basis-3/4">
				<CardHeader>
					<CardTitle className="flex flex-row items-center justify-between">
						<span>Income</span>
						<Bitcoin className="text-muted-foreground" />
					</CardTitle>
					<CardDescription>A breakdown of your income.</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[400px]">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">Income ID</TableHead>
									<TableHead>Year</TableHead>
									<TableHead>Month</TableHead>
									<TableHead className="text-right">Amount</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{income.map((income) => (
									<TableRow key={income.incomeId}>
										<TableCell className="font-medium">
											{income.incomeId}
										</TableCell>
										<TableCell>{income.incomeYear}</TableCell>
										<TableCell>
											{capitalizeFirstLetter(income.incomeMonth)}
										</TableCell>
										<TableCell className="text-right">
											${income.incomeAmount}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</ScrollArea>
				</CardContent>
			</Card>

			<Card className="basis-1/4">
				<CardHeader>
					<CardTitle className="flex flex-row items-center justify-between">
						<span>Add Income</span>
						<Receipt className="text-muted-foreground" />
					</CardTitle>
					<CardDescription>
						Use this section to add your income.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full space-y-6"
						>
							<FormField
								control={form.control}
								name="incomeAmount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Amount</FormLabel>
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
										<FormDescription>
											Amount of transaction in dollars.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="incomeMonth"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Month</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a month" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="jan">January</SelectItem>
												<SelectItem value="feb">February</SelectItem>
												<SelectItem value="mar">March</SelectItem>
												<SelectItem value="apr">April</SelectItem>
												<SelectItem value="may">May</SelectItem>
												<SelectItem value="jun">June</SelectItem>
												<SelectItem value="jul">July</SelectItem>
												<SelectItem value="aug">August</SelectItem>
												<SelectItem value="sep">September</SelectItem>
												<SelectItem value="oct">October</SelectItem>
												<SelectItem value="nov">November</SelectItem>
												<SelectItem value="dec">December</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="incomeYear"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Year</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a year" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="2021">2021</SelectItem>
												<SelectItem value="2022">2022</SelectItem>
												<SelectItem value="2023">2023</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full">
								Add income
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}

export default IncomeTab
