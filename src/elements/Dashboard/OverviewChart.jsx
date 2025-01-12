import {
	ResponsiveContainer,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Line,
	LineChart,
} from "recharts"

const data = [
	{
		name: "Jan",
		total: 2500,
	},
	{
		name: "Feb",
		total: 2600,
	},
	{
		name: "Mar",
		total: 2400,
	},
	{
		name: "Apr",
		total: 3200,
	},
	{
		name: "May",
		total: 2800,
	},
	{
		name: "Jun",
		total: 2700,
	},
	{
		name: "Jul",
		total: 2900,
	},
	{
		name: "Aug",
		total: 3100,
	},
	{
		name: "Sep",
		total: 3300,
	},
	{
		name: "Oct",
		total: 3400,
	},
	{
		name: "Nov",
		total: 3000,
	},
	{
		name: "Dec",
		total: 3600,
	},
]

const OverviewChart = () => {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<LineChart data={data}>
				<XAxis
					dataKey="name"
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `$${value}`}
				/>
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip />
				<Line type="monotone" dataKey="total" stroke="#a26df9" />
			</LineChart>
		</ResponsiveContainer>
	)
}

export default OverviewChart
