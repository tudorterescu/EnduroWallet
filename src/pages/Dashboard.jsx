// UI Components
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Theme toggle
import { ModeToggle } from "@/components/mode-toggle"

// Icons
import { Wallet } from "lucide-react"

// Components from different files
import DashNav from "../elements/Dashboard/DashNav"
import UserNav from "../elements/Dashboard/UserNav"
import OverviewTab from "../elements/Dashboard/Tabs/OverviewTab"
import SpendingTab from "../elements/Dashboard/Tabs/TransactionsTab"
import IncomeTab from "../elements/Dashboard/Tabs/IncomeTab"
import SaversTab from "../elements/Dashboard/Tabs/SaversTab"
import InsightsTab from "../elements/Dashboard/Tabs/InsightsTab"

const Dashboard = () => {
	return (
		<div>
			<Card className="m-10">
				<CardContent>
					<div className="flex items-center justify-between border-b pb-5">
						<div className="pt-5 flex flex-row items-center gap-5">
							<DashNav />
						</div>

						<div className="flex flex-row items-center space-x-4">
							<UserNav />
							<ModeToggle />
						</div>
					</div>

					<div className="flex flex-row items-center justify-between pt-5">
						<div className="flex items-center space-x-2">
							<Wallet className="text-foreground" />
							<h2 className="text-3xl font-bold tracking-tight">
								Endurowallet
							</h2>
						</div>
					</div>

					<Tabs defaultValue="overview" className="space-y-4 pt-5">
						<TabsList>
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="transactions">Transactions</TabsTrigger>
							<TabsTrigger value="income">Income</TabsTrigger>
							<TabsTrigger value="savers">Savers</TabsTrigger>
							<TabsTrigger value="insights">Insights</TabsTrigger>
						</TabsList>
						<TabsContent value="overview" className="space-y-4">
							<OverviewTab />
						</TabsContent>
						<TabsContent value="transactions">
							<SpendingTab />
						</TabsContent>
						<TabsContent value="income">
							<IncomeTab />
						</TabsContent>
						<TabsContent value="savers">
							<SaversTab />
						</TabsContent>
						<TabsContent value="insights">
							<InsightsTab />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	)
}

export default Dashboard
