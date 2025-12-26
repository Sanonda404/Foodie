import { useState } from 'react';
import { OrderQueue } from './canteen/OrderQueue';
import { Analytics } from './canteen/Analytics';
import { MenuManager } from './canteen/MenuManager';
import { ComplaintsManager } from './canteen/ComplaintsManager';
import { ClipboardList, BarChart3, MenuSquare, AlertTriangle } from 'lucide-react';
import { Order, MenuItem, Complaint } from '../types';
import { generateMockOrders, mockMenuItems } from '../data/mockData';

interface CanteenViewProps {
  complaints: Complaint[];
  onUpdateComplaint: (id: string, updates: Partial<Complaint>) => void;
}

export function CanteenView({ complaints, onUpdateComplaint }: CanteenViewProps) {
  const [activeTab, setActiveTab] = useState<'queue' | 'analytics' | 'menu' | 'complaints'>('queue');
  const [orders, setOrders] = useState<Order[]>(generateMockOrders());
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(menuItems.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const addMenuItem = (newItem: MenuItem) => {
    setMenuItems([...menuItems, newItem]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('queue')}
          className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'queue'
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <ClipboardList className="w-5 h-5" />
          Order Queue
          {orders.filter(o => o.status !== 'completed').length > 0 && (
            <span className="bg-purple-500 text-white text-xs rounded-full px-2 py-0.5">
              {orders.filter(o => o.status !== 'completed').length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'analytics'
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          Analytics
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'menu'
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <MenuSquare className="w-5 h-5" />
          Menu Manager
        </button>
        <button
          onClick={() => setActiveTab('complaints')}
          className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'complaints'
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <AlertTriangle className="w-5 h-5" />
          Complaints Manager
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'queue' && (
        <OrderQueue orders={orders} onUpdateStatus={updateOrderStatus} />
      )}
      {activeTab === 'analytics' && (
        <Analytics orders={orders} menuItems={menuItems} />
      )}
      {activeTab === 'menu' && (
        <MenuManager menuItems={menuItems} onUpdateItem={updateMenuItem} onAddItem={addMenuItem} />
      )}
      {activeTab === 'complaints' && (
        <ComplaintsManager complaints={complaints} onUpdateComplaint={onUpdateComplaint} />
      )}
    </div>
  );
}