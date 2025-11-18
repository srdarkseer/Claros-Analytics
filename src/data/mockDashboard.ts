/**
 * Mock dashboard data for analytics visualization
 */

export interface DashboardMetrics {
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  conversionRate: number;
  revenueChange: number;
  usersChange: number;
  ordersChange: number;
  conversionChange: number;
}

export interface TimeSeriesData {
  date: string;
  revenue: number;
  users: number;
  orders: number;
}

export interface CategoryData {
  category: string;
  value: number;
  color?: string;
}

export interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
}

export const dashboardMetrics: DashboardMetrics = {
  totalUsers: 12450,
  totalRevenue: 245678,
  totalOrders: 3421,
  conversionRate: 3.2,
  revenueChange: 12.5,
  usersChange: 8.3,
  ordersChange: 15.2,
  conversionChange: -2.1,
};

export const timeSeriesData: TimeSeriesData[] = [
  { date: 'Jan', revenue: 45000, users: 1200, orders: 320 },
  { date: 'Feb', revenue: 52000, users: 1350, orders: 380 },
  { date: 'Mar', revenue: 48000, users: 1280, orders: 350 },
  { date: 'Apr', revenue: 61000, users: 1500, orders: 420 },
  { date: 'May', revenue: 55000, users: 1420, orders: 390 },
  { date: 'Jun', revenue: 67000, users: 1650, orders: 450 },
  { date: 'Jul', revenue: 72000, users: 1780, orders: 490 },
  { date: 'Aug', revenue: 68000, users: 1720, orders: 470 },
  { date: 'Sep', revenue: 75000, users: 1850, orders: 510 },
  { date: 'Oct', revenue: 82000, users: 1950, orders: 560 },
  { date: 'Nov', revenue: 78000, users: 1880, orders: 530 },
  { date: 'Dec', revenue: 89000, users: 2100, orders: 590 },
];

export const categoryData: CategoryData[] = [
  { category: 'Electronics', value: 35, color: '#3b82f6' },
  { category: 'Clothing', value: 28, color: '#10b981' },
  { category: 'Food & Beverages', value: 20, color: '#f59e0b' },
  { category: 'Home & Garden', value: 12, color: '#ef4444' },
  { category: 'Other', value: 5, color: '#8b5cf6' },
];

export const topProducts: TopProduct[] = [
  { name: 'Wireless Headphones', sales: 1240, revenue: 186000 },
  { name: 'Smart Watch', sales: 980, revenue: 196000 },
  { name: 'Laptop Stand', sales: 1560, revenue: 78000 },
  { name: 'USB-C Cable', sales: 3200, revenue: 48000 },
  { name: 'Phone Case', sales: 2100, revenue: 42000 },
];

export const weeklyData = [
  { day: 'Mon', sales: 120, visitors: 450 },
  { day: 'Tue', sales: 190, visitors: 520 },
  { day: 'Wed', sales: 300, visitors: 680 },
  { day: 'Thu', sales: 250, visitors: 590 },
  { day: 'Fri', sales: 320, visitors: 750 },
  { day: 'Sat', sales: 280, visitors: 620 },
  { day: 'Sun', sales: 150, visitors: 480 },
];
