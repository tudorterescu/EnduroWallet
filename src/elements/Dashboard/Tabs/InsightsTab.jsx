import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Legend,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
	Line,
	CartesianGrid,
	AreaChart,
	Area,
	BarChart,
	Bar,
} from "recharts"

import { BarChartHorizontal, TrendingUp, ArrowUpDown } from "lucide-react"

const data = [
	{ period: "Jan", income: 4000, transactions: 2500 },
	{ period: "Feb", income: 4200, transactions: 2600 },
	{ period: "Mar", income: 4500, transactions: 3000 },
	{ period: "Apr", income: 4800, transactions: 3100 },
	{ period: "May", income: 5000, transactions: 3500 },
	{ period: "Jun", income: 5200, transactions: 3300 },
	{ period: "Jul", income: 5400, transactions: 3700 },
	{ period: "Aug", income: 5600, transactions: 3900 },
	{ period: "Sep", income: 5800, transactions: 4200 },
	{ period: "Oct", income: 6000, transactions: 4500 },
	{ period: "Nov", income: 6200, transactions: 4800 },
	{ period: "Dec", income: 6400, transactions: 5000 },
]

const spendingData = [
	{
		month: "Jan",
		groceries: 300,
		entertainment: 150,
		utilities: 200,
		rent: 800,
		other: 250,
	},
	{
		month: "Feb",
		groceries: 320,
		entertainment: 130,
		utilities: 210,
		rent: 800,
		other: 220,
	},
	{
		month: "Mar",
		groceries: 280,
		entertainment: 170,
		utilities: 190,
		rent: 800,
		other: 260,
	},
	{
		month: "Apr",
		groceries: 290,
		entertainment: 160,
		utilities: 200,
		rent: 800,
		other: 240,
	},
	{
		month: "May",
		groceries: 310,
		entertainment: 200,
		utilities: 205,
		rent: 800,
		other: 230,
	},
	{
		month: "Jun",
		groceries: 300,
		entertainment: 180,
		utilities: 215,
		rent: 800,
		other: 255,
	},
]

const savingsData = [
	{ month: "Jan", totalSavings: 200 },
	{ month: "Feb", totalSavings: 300 },
	{ month: "Mar", totalSavings: 250 },
	{ month: "Apr", totalSavings: 400 },
	{ month: "May", totalSavings: 350 },
	{ month: "Jun", totalSavings: 450 },
]

const InsightsTab = () => {
	return (
		<div className="flex flex-row items-stretch space-x-5">
			<Card className="basis-1/3">
				<CardHeader>
					<CardTitle className="flex flex-row items-center justify-between">
						<span>Transactions vs Income</span>
						<TrendingUp className="text-muted-foreground" />
					</CardTitle>
					<CardDescription>
						A visual representation of your spending vs income.
					</CardDescription>
					<CardContent>
						<LineChart width={400} height={400} data={data}>
							<XAxis dataKey="period" />
							{/* <YAxis /> */}
							<CartesianGrid />
							<Tooltip />
							<Legend />
							<Line type="monotone" dataKey="income" stroke="#8884d8" />
							<Line type="monotone" dataKey="transactions" stroke="#82ca9d" />
						</LineChart>
					</CardContent>
				</CardHeader>
			</Card>
			<Card className="basis-1/3">
				<CardHeader>
					<CardTitle className="flex flex-row items-center justify-between">
						<span>Category Spending</span>
						<BarChartHorizontal className="text-muted-foreground" />
					</CardTitle>
					<CardDescription>
						A breakdown of your spending per category.
					</CardDescription>
					<CardContent>
						<AreaChart width={400} height={400} data={spendingData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="month" />
							<YAxis />
							<Tooltip />
							<Area
								type="monotone"
								dataKey="groceries"
								stackId="1"
								stroke="#8884d8"
								fill="#8884d8"
							/>
							<Area
								type="monotone"
								dataKey="entertainment"
								stackId="1"
								stroke="#82ca9d"
								fill="#82ca9d"
							/>
							<Area
								type="monotone"
								dataKey="utilities"
								stackId="1"
								stroke="#ffc658"
								fill="#ffc658"
							/>
							<Area
								type="monotone"
								dataKey="rent"
								stackId="1"
								stroke="#8a2be2"
								fill="#8a2be2"
							/>
							<Area
								type="monotone"
								dataKey="other"
								stackId="1"
								stroke="#fa8072"
								fill="#fa8072"
							/>
						</AreaChart>
					</CardContent>
				</CardHeader>
			</Card>
			<Card className="basis-1/3">
				<CardHeader>
					<CardTitle className="flex flex-row items-center justify-between">
						<span>Total savings</span>
						<ArrowUpDown className="text-muted-foreground" />
					</CardTitle>
					<CardDescription>
						A chart of your total savings overtime.
					</CardDescription>
					<CardContent>
						<BarChart width={400} height={400} data={savingsData}>
							<XAxis dataKey="month" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="totalSavings" fill="#a26df9" />
						</BarChart>
					</CardContent>
				</CardHeader>
			</Card>
		</div>
	)
}

export default InsightsTab
