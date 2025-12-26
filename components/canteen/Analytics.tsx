import { Order, MenuItem } from "../../types";
import { TrendingUp, DollarSign, Clock, Package } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface AnalyticsProps {
  orders: Order[];
  menuItems: MenuItem[];
}

export function Analytics({ orders }: AnalyticsProps) {
  // Calculate metrics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Peak hours analysis
  const hourlyOrders = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    orders: 0,
  }));

  orders.forEach((order) => {
    const hour = order.orderTime.getHours();
    hourlyOrders[hour].orders += 1;
  });

  const peakHoursData = hourlyOrders
    .filter((h) => h.orders > 0)
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 8);

  // Popular items analysis
  const itemCounts: {
    [key: string]: { name: string; count: number; revenue: number };
  } = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!itemCounts[item.menuItem.id]) {
        itemCounts[item.menuItem.id] = {
          name: item.menuItem.name,
          count: 0,
          revenue: 0,
        };
      }
      itemCounts[item.menuItem.id].count += item.quantity;
      itemCounts[item.menuItem.id].revenue +=
        item.menuItem.price * item.quantity;
    });
  });

  const popularItems = Object.values(itemCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Category distribution
  const categoryData: { [key: string]: number } = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!categoryData[item.menuItem.category]) {
        categoryData[item.menuItem.category] = 0;
      }
      categoryData[item.menuItem.category] += item.quantity;
    });
  });

  const categoryChartData = Object.entries(categoryData).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const COLORS = [
    "#f97316",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-gray-900">Daily Analytics</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Total Orders</p>
            <Package className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-gray-900">{totalOrders}</p>
          <p className="text-green-600 text-sm mt-1">
            {completedOrders} completed
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-gray-900">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-gray-500 text-sm mt-1">
            ₹{avgOrderValue.toFixed(0)} avg per order
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Avg Wait Time</p>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-gray-900">12 min</p>
          <p className="text-green-600 text-sm mt-1">-3 min from yesterday</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Popular Item</p>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-gray-900">{popularItems[0]?.name || "N/A"}</p>
          <p className="text-gray-500 text-sm mt-1">
            {popularItems[0]?.count || 0} sold today
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Hours Chart */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-gray-900 mb-4">Peak Hours</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-gray-900 mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryChartData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Popular Items Table */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-gray-900 mb-4">Top Selling Items</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-gray-700 text-sm">
                  Rank
                </th>
                <th className="text-left py-3 px-4 text-gray-700 text-sm">
                  Item
                </th>
                <th className="text-right py-3 px-4 text-gray-700 text-sm">
                  Orders
                </th>
                <th className="text-right py-3 px-4 text-gray-700 text-sm">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {popularItems.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0
                          ? "bg-yellow-100 text-yellow-700"
                          : index === 1
                          ? "bg-gray-100 text-gray-700"
                          : index === 2
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{item.name}</td>
                  <td className="py-3 px-4 text-right text-gray-900">
                    {item.count}
                  </td>
                  <td className="py-3 px-4 text-right text-orange-500">
                    ₹{item.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-blue-900 mb-2">💡 Insights & Recommendations</h3>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>
            • Peak hour is {peakHoursData[0]?.hour || "N/A"} with{" "}
            {peakHoursData[0]?.orders || 0} orders - consider extra staff during
            this time
          </li>
          <li>
            • {popularItems[0]?.name || "N/A"} is your best seller - ensure
            adequate stock
          </li>
          <li>
            • Average preparation time is on track - maintain current efficiency
          </li>
          <li>
            • Group orders account for a small percentage - consider promoting
            this feature
          </li>
        </ul>
      </div>
    </div>
  );
}
