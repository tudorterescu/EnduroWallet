import { useState, useEffect } from "react"

import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from "@/components/ui/card"

import OverviewChart from "../OverviewChart"
import RecentTransactions from "../RecentTransactions"

import { DollarSign } from "lucide-react"
import { CreditCard } from "lucide-react"

import { useAuth } from "@/src/contexts/AuthContext"
import { db } from "@/src/firebase"
import { collection, getDocs } from "firebase/firestore"

const OverviewTab = () => {
	const { currentUser } = useAuth()
	const [totalSavings, setTotalSavings] = useState(0)
	const [totalIncome, setTotalIncome] = useState(0)

	useEffect(() => {
		const fetchSavingsData = async () => {
			if (currentUser) {
				const uid = currentUser.uid
				const savingsRef = collection(db, "users", uid, "savers")
				const savingsSnapshot = await getDocs(savingsRef)
				let savingsTotal = 0

				savingsSnapshot.forEach((doc) => {
					const data = doc.data()
					// Check if saverAmount is a number
					if (typeof data.saverAmount === "number") {
						savingsTotal += data.saverAmount
					} else {
						console.error(
							`Invalid saverAmount type: ${typeof data.saverAmount}, expected number`
						)
					}
				})

				setTotalSavings(savingsTotal)

				// Fetch income data
				const incomeRef = collection(db, "users", uid, "income")
				const incomeSnapshot = await getDocs(incomeRef)
				let incomeTotal = 0
				incomeSnapshot.forEach((doc) => {
					const data = doc.data()
					if (typeof data.incomeAmount === "number") {
						incomeTotal += data.incomeAmount
					} else {
						console.error(
							`Invalid incomeAmount type: ${typeof data.incomeAmount}, expected number`
						)
					}
				})
				setTotalIncome(incomeTotal)
			}
		}

		fetchSavingsData()
	}, [currentUser])

	return (
		<>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Savings</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">${totalSavings.toFixed(2)}</div>
						<p className="text-xs text-muted-foreground">Keep going!</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Income</CardTitle>
						<CreditCard className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">${totalIncome.toFixed(2)}</div>
						<p className="text-xs text-muted-foreground">Wow, that is a lot.</p>
					</CardContent>
				</Card>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Savings Overview</CardTitle>
						<CardDescription>
							Here is a brief overview of your savings for the year.
						</CardDescription>
					</CardHeader>
					<CardContent className="pl-2">
						<OverviewChart />
					</CardContent>
				</Card>
				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Recent Transactions</CardTitle>
						<CardDescription>
							You made 23 transactions this month.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<RecentTransactions />
					</CardContent>
				</Card>
			</div>
		</>
	)
}

export default OverviewTab
