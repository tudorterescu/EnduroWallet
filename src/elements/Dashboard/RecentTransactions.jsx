const RecentTransactions = () => {
	return (
		<div className="space-y-8">
			<div className="flex items-center">
				<div className="ml-4 space-y-1">
					<p className="text-sm font-medium leading-none">Coral Café</p>
					<p className="text-sm text-muted-foreground">Sydney, NSW</p>
				</div>
				<div className="ml-auto font-medium">$23.45</div>
			</div>
			<div className="flex items-center">
				<div className="ml-4 space-y-1">
					<p className="text-sm font-medium leading-none">Outback Supplies</p>
					<p className="text-sm text-muted-foreground">Alice Springs, NT</p>
				</div>
				<div className="ml-auto font-medium">$129.99</div>
			</div>
			<div className="flex items-center">
				<div className="ml-4 space-y-1">
					<p className="text-sm font-medium leading-none">
						Great Barrier Reef Tours
					</p>
					<p className="text-sm text-muted-foreground">Cairns, QLD</p>
				</div>
				<div className="ml-auto font-medium">$450.00</div>
			</div>
			<div className="flex items-center">
				<div className="ml-4 space-y-1">
					<p className="text-sm font-medium leading-none">Uluru Adventures</p>
					<p className="text-sm text-muted-foreground">Uluru, NT</p>
				</div>
				<div className="ml-auto font-medium">$350.00</div>
			</div>
			<div className="flex items-center">
				<div className="ml-4 space-y-1">
					<p className="text-sm font-medium leading-none">Opera House Gifts</p>
					<p className="text-sm text-muted-foreground">Sydney, NSW</p>
				</div>
				<div className="ml-auto font-medium">$89.95</div>
			</div>
		</div>
	)
}

export default RecentTransactions
