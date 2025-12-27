import { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, Package, Utensils, Users } from 'lucide-react';

// --- Interfaces matching backend payload ---
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: 'MainCourse' | 'Snacks' | 'Beverages' | 'Desserts';
  price: number;
  available: boolean;
  image: string;
  prepTime: number;
  stock: number;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready';

export interface Order {
  id: number;
  token: string;
  orderTime: string;       // ISO string from backend
  pickupTime: string;      // ISO string from backend
  totalPrice: number;
  status: OrderStatus;
  isGroupOrder: boolean;
  groupMembers?: string[];
  items: OrderItem[];
}

export function MyOrders({ studentId }: { studentId: number }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get<Order[]>(`http://localhost:8000/order/${12345}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [studentId]);

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'preparing':
        return <Utensils className="w-5 h-5 text-blue-500" />;
      case 'ready':
        return <Package className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'preparing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ready':
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-gray-500 mb-2">No orders yet</h3>
        <p className="text-gray-400 text-sm">Your orders will appear here</p>
      </div>
    );
  }

  // Sort by orderTime descending
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime()
  );

  return (
    <div className="space-y-4">
      <h2 className="text-gray-900">My Orders</h2>

      {sortedOrders.map(order => (
        <div key={order.id} className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-gray-900">Order #{order.id}</h3>
                <div className={`px-3 py-1 rounded-full border text-sm ${getStatusColor(order.status)} flex items-center gap-2`}>
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                Ordered at {new Date(order.orderTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <div className="text-center md:text-right">
              <div className="bg-orange-50 border border-orange-200 rounded-lg px-6 py-3">
                <p className="text-orange-500 text-sm mb-1">Your Token</p>
                <p className="text-orange-600">{order.token}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pickup Time</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">
                  {new Date(order.pickupTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {order.isGroupOrder && order.groupMembers && order.groupMembers.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Group Members</p>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{order.groupMembers.join(', ')}</span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 mb-2">Items</p>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">{item.menuItem.name}</span>
                    <span className="text-gray-500 text-sm">x{item.quantity}</span>
                  </div>
                  <span className="text-gray-900">₹{item.menuItem.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <span className="text-gray-900">Total</span>
              <span className="text-orange-500">₹{order.totalPrice}</span>
            </div>
          </div>

          {order.status === 'ready' && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 text-center">
                ✓ Your order is ready! Please collect it from the counter.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}