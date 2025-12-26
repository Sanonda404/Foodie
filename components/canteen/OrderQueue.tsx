import { Order } from '../../types';
import { Clock, Users, ArrowRight } from 'lucide-react';

interface OrderQueueProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

export function OrderQueue({ orders, onUpdateStatus }: OrderQueueProps) {
  // Sort orders by priority: pickup time first, then order time
  const sortedOrders = [...orders]
    .filter(order => order.status !== 'completed')
    .sort((a, b) => {
      // First priority: pickup time
      const timeDiff = a.pickupTime.getTime() - b.pickupTime.getTime();
      if (timeDiff !== 0) return timeDiff;
      
      // Second priority: order time (earlier orders first)
      return a.orderTime.getTime() - b.orderTime.getTime();
    });

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    switch (currentStatus) {
      case 'pending':
        return 'preparing';
      case 'preparing':
        return 'ready';
      case 'ready':
        return 'completed';
      default:
        return null;
    }
  };

  const getStatusButtonText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Start Preparing';
      case 'preparing':
        return 'Mark Ready';
      case 'ready':
        return 'Complete';
      default:
        return '';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'border-l-amber-500 bg-amber-50';
      case 'preparing':
        return 'border-l-blue-500 bg-blue-50';
      case 'ready':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getUrgencyBadge = (order: Order) => {
    const now = new Date();
    const timeUntilPickup = order.pickupTime.getTime() - now.getTime();
    const minutesUntilPickup = Math.floor(timeUntilPickup / 60000);

    if (minutesUntilPickup < 5) {
      return <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">URGENT</span>;
    } else if (minutesUntilPickup < 15) {
      return <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded">Soon</span>;
    }
    return null;
  };

  if (sortedOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-gray-500 mb-2">No pending orders</h3>
        <p className="text-gray-400 text-sm">New orders will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-900">Active Orders - Priority Queue</h2>
        <div className="text-sm text-gray-500">
          {sortedOrders.length} orders in queue
        </div>
      </div>

      <div className="grid gap-4">
        {sortedOrders.map((order, index) => (
          <div
            key={order.id}
            className={`bg-white rounded-lg shadow-sm border-l-4 ${getStatusColor(order.status)} p-6`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-gray-900">Order #{order.id}</h3>
                    <p className="text-gray-600 text-sm">{order.studentName}</p>
                  </div>
                  {getUrgencyBadge(order)}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Pickup Time</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">
                        {order.pickupTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Order Time</p>
                    <span className="text-gray-600 text-sm">
                      {order.orderTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {order.isGroupOrder && order.groupMembers && order.groupMembers.length > 0 && (
                  <div className="mb-4 flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="text-purple-700">Group Order: {order.groupMembers.join(', ')}</span>
                  </div>
                )}

                <div className="bg-white border rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-2">Items</p>
                  <div className="space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          {item.quantity}x {item.menuItem.name}
                        </span>
                        <span className="text-gray-500">{item.menuItem.prepTime} min</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col gap-2 items-stretch md:items-end">
                <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 text-center">
                  <p className="text-orange-500 text-xs mb-1">Token</p>
                  <p className="text-orange-600">{order.token}</p>
                </div>

                {getNextStatus(order.status) && (
                  <button
                    onClick={() => onUpdateStatus(order.id, getNextStatus(order.status)!)}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center gap-2 justify-center whitespace-nowrap"
                  >
                    {getStatusButtonText(order.status)}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}