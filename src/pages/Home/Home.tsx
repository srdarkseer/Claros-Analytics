import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Users, DollarSign, ShoppingCart, TrendingUp, TrendingDown } from 'lucide-react';
import {
  dashboardMetrics,
  timeSeriesData,
  categoryData,
  topProducts,
  weeklyData,
} from '@/data/mockDashboard';
import type { ChartConfig } from '@/components/ui/chart';

// Distinct colors for charts
const CHART_COLORS = {
  primary: '#3b82f6', // Blue
  secondary: '#10b981', // Green
  tertiary: '#f59e0b', // Amber
  quaternary: '#ef4444', // Red
  quinary: '#8b5cf6', // Purple
  senary: '#ec4899', // Pink
};

const revenueChartConfig: ChartConfig = {
  revenue: {
    label: 'Revenue',
    color: CHART_COLORS.primary,
  },
  users: {
    label: 'Users',
    color: CHART_COLORS.secondary,
  },
  orders: {
    label: 'Orders',
    color: CHART_COLORS.tertiary,
  },
};

const salesChartConfig: ChartConfig = {
  sales: {
    label: 'Sales',
    color: CHART_COLORS.quaternary,
  },
  visitors: {
    label: 'Visitors',
    color: CHART_COLORS.quinary,
  },
};

const categoryChartConfig: ChartConfig = {
  Electronics: {
    label: 'Electronics',
    color: CHART_COLORS.primary,
  },
  Clothing: {
    label: 'Clothing',
    color: CHART_COLORS.secondary,
  },
  'Food & Beverages': {
    label: 'Food & Beverages',
    color: CHART_COLORS.tertiary,
  },
  'Home & Garden': {
    label: 'Home & Garden',
    color: CHART_COLORS.quaternary,
  },
  Other: {
    label: 'Other',
    color: CHART_COLORS.quinary,
  },
};

function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  formatter,
}: {
  title: string;
  value: number;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  formatter?: (value: number) => string;
}) {
  const isPositive = change >= 0;
  const formattedValue = formatter ? formatter(value) : value.toLocaleString();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          {isPositive ? (
            <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
          )}
          <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
            {Math.abs(change).toFixed(1)}%
          </span>
          <span className="ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0 overflow-x-hidden">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Welcome to Claros Analytics Dashboard
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={dashboardMetrics.totalUsers}
          change={dashboardMetrics.usersChange}
          icon={Users}
        />
        <MetricCard
          title="Total Revenue"
          value={dashboardMetrics.totalRevenue}
          change={dashboardMetrics.revenueChange}
          icon={DollarSign}
          formatter={val => `$${val.toLocaleString()}`}
        />
        <MetricCard
          title="Total Orders"
          value={dashboardMetrics.totalOrders}
          change={dashboardMetrics.ordersChange}
          icon={ShoppingCart}
        />
        <MetricCard
          title="Conversion Rate"
          value={dashboardMetrics.conversionRate}
          change={dashboardMetrics.conversionChange}
          icon={TrendingUp}
          formatter={val => `${val}%`}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {/* Revenue Trend Chart */}
        <Card className="col-span-1 overflow-hidden">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue, users, and orders</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6 overflow-hidden">
            <div className="w-full min-w-0 overflow-hidden">
              <ChartContainer
                config={revenueChartConfig}
                className="h-[250px] sm:h-[320px] w-full max-w-full min-w-0"
              >
                <AreaChart
                  data={timeSeriesData}
                  margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 10 }}
                    width={40}
                    label={{ value: 'Revenue', angle: -90, position: 'insideLeft', fontSize: 10 }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 10 }}
                    width={40}
                    label={{
                      value: 'Users & Orders',
                      angle: 90,
                      position: 'insideRight',
                      fontSize: 10,
                    }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke={CHART_COLORS.primary}
                    fill={CHART_COLORS.primary}
                    fillOpacity={0.6}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="users"
                    stroke={CHART_COLORS.secondary}
                    fill={CHART_COLORS.secondary}
                    fillOpacity={0.6}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders"
                    stroke={CHART_COLORS.tertiary}
                    fill={CHART_COLORS.tertiary}
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Sales Chart */}
        <Card className="col-span-1 overflow-hidden">
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>Sales and visitors for the past week</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6 overflow-hidden">
            <div className="w-full min-w-0 overflow-hidden">
              <ChartContainer
                config={salesChartConfig}
                className="h-[250px] sm:h-[320px] w-full max-w-full min-w-0"
              >
                <BarChart data={weeklyData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} width={40} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="sales" fill={CHART_COLORS.quaternary} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="visitors" fill={CHART_COLORS.quinary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {/* Category Distribution */}
        <Card className="col-span-1 overflow-hidden">
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Revenue by product category</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6 overflow-hidden">
            <div className="w-full min-w-0 overflow-hidden">
              <ChartContainer
                config={categoryChartConfig}
                className="h-[250px] sm:h-[320px] w-full max-w-full min-w-0"
              >
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percent }) =>
                      `${category} ${percent ? (percent * 100).toFixed(0) : 0}%`
                    }
                    outerRadius={60}
                    fill={CHART_COLORS.primary}
                    dataKey="value"
                  >
                    {categoryData.map((_entry, index) => {
                      const colors = [
                        CHART_COLORS.primary,
                        CHART_COLORS.secondary,
                        CHART_COLORS.tertiary,
                        CHART_COLORS.quaternary,
                        CHART_COLORS.quinary,
                      ];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="col-span-1 overflow-hidden">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6 overflow-hidden">
            <div className="w-full min-w-0 overflow-hidden">
              <ChartContainer
                config={revenueChartConfig}
                className="h-[250px] sm:h-[320px] w-full max-w-full min-w-0"
              >
                <BarChart
                  data={topProducts}
                  layout="vertical"
                  margin={{ top: 10, right: 5, left: 50, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={45}
                    tick={{ fontSize: 9 }}
                    angle={0}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Products Details</CardTitle>
          <CardDescription>Sales and revenue breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Sales</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-right">{product.sales.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${product.revenue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
