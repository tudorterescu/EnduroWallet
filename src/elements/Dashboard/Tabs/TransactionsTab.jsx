import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import {
	Card,
	CardContent,
	CardTitle,
	CardDescription,
	CardHeader,
} from "@/components/ui/card"

import { ScrollArea } from "@/components/ui/scroll-area"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Form
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

// icons
import { ScanBarcode, ShoppingCart } from "lucide-react"

// firebase query imports
import { useEffect, useState } from "react"
import { collection, getDocs, doc, setDoc } from "firebase/firestore"
import { db } from "../../../firebase"
import { useAuth } from "../../../contexts/AuthContext"

const FormSchema = z.object({
	transactionValue: z
		.number()
		.transform((value) => parseFloat(value))
		.refine((value) => !isNaN(value) && value > 0, {
			message: "Transaction value must be a positive number.",
		}),
	transactionCategory: z.string().min(1, {
		message: "Please select a transaction category.",
	}),
	transactionMonth: z.string().min(1, {
		message: "Please select a transaction month.",
	}),
	transactionYear: z.string().min(4, {
		message: "Please enter a valid year.",
	}),
})

const SpendingTab = () => {
	const { currentUser } = useAuth()
	const [transactions, setTransactions] = useState([])
	const { toast } = useToast()

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				// Pointing to the subcollection of transactions for the specific user
				const transactionsRef = collection(
					db,
					"users",
					currentUser.uid,
					"transactions"
				)
				const querySnapshot = await getDocs(transactionsRef)
				const fetchedTransactions = []
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					const data = doc.data()
					fetchedTransactions.push({
						...data,
						transactionId: data.transactionId,
					})
				})
				setTransactions(fetchedTransactions)
			} catch (error) {
				console.error("Error fetching transactions: ", error)
			}
		}

		if (currentUser) {
			fetchTransactions()
		}
	}, [currentUser])

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			transactionValue: "",
			transactionCategory: "",
			transactionMonth: "",
			transactionYear: "",
		},
	})

	const capitalizeFirstLetter = (string) => {
		return string ? string.charAt(0).toUpperCase() + string.slice(1) : ""
	}

	const onSubmit = async (data) => {
		try {
			// Create a new document reference with an auto-generated ID
			const newTransactionRef = doc(
				collection(db, "users", currentUser.uid, "transactions")
			)

			// Set the data for the new document
			await setDoc(newTransactionRef, {
				transactionId: newTransactionRef.id, // Use the auto-generated ID as the transaction ID
				transactionValue: data.transactionValue,
				transactionCategory: data.transactionCategory,
				transactionMonth: data.transactionMonth,
				transactionYear: data.transactionYear,
			})

			// Update the transactions state to include the new transaction
			setTransactions((prevTransactions) => [
				...prevTransactions,
				{
					transactionId: newTransactionRef.id,
					transactionValue: data.transactionValue,
					transactionCategory: data.transactionCategory,
					transactionMonth: data.transactionMonth,
					transactionYear: data.transactionYear,
				},
			])

			console.log("Transaction added successfully!")
			toast({
				title: "Success",
				description: "Transaction added successfully!",
				status: "success",
			})
		} catch (error) {
			console.error("Error adding transaction: ", error)
			toast({
				title: "Error",
				description: `Error adding transaction: ${error.message}`,
				status: "error",
			})
		}
	}

	return (
		<div className="flex flex-row items-stretch space-x-5">
			<Card className="basis-3/4">
				<CardHeader>
					<CardTitle className="flex flex-row items-center justify-between">
						<span>Transactions</span>
						<ScanBarcode className="text-muted-foreground" />
					</CardTitle>
					<CardDescription>A list of your recent transactions.</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[400px]">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">Transaction ID</TableHead>
									<TableHead>Year</TableHead>
									<TableHead>Month</TableHead>
									<TableHead>Category</TableHead>
									<TableHead className="text-right">Amount</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{transactions.map((transaction) => (
									<TableRow key={transaction.transactionId}>
										<TableCell className="font-medium">
											{transaction.transactionId}
										</TableCell>
										<TableCell>{transaction.transactionYear}</TableCell>
										<TableCell>
											{capitalizeFirstLetter(transaction.transactionMonth)}
										</TableCell>
										<TableCell>
											{capitalizeFirstLetter(transaction.transactionCategory)}
										</TableCell>
										<TableCell className="text-right">
											${transaction.transactionValue}
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
						<span>Add transactions</span>
						<ShoppingCart className="text-muted-foreground" />
					</CardTitle>
					<CardDescription>
						Use this section to add transactions to the list.
					</CardDescription>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="w-full space-y-6"
							>
								<FormField
									control={form.control}
									name="transactionValue"
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
									name="transactionCategory"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a category type" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="groceries">Groceries</SelectItem>
													<SelectItem value="shopping">Shopping</SelectItem>
													<SelectItem value="misc">Miscellaneous</SelectItem>
													<SelectItem value="hobbies">Hobbies</SelectItem>
													<SelectItem value="bills">Bills</SelectItem>
													<SelectItem value="rent">Rent</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="transactionMonth"
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
									name="transactionYear"
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
									Add transaction
								</Button>
							</form>
						</Form>
					</CardContent>
				</CardHeader>
			</Card>
		</div>
	)
}

export default SpendingTab
