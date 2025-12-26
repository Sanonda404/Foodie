import { useState } from 'react';
import { MenuBrowser } from './student/MenuBrowser';
import { OrderCart } from './student/OrderCart';
import { MyOrders } from './student/MyOrders';
import { RushHourChatbot } from './student/RushHourChatbot';
import { ReviewComplaint } from './student/ReviewComplaint';
import { ShoppingCart, Receipt, UtensilsCrossed, MessageSquare } from 'lucide-react';
import { OrderItem, Order, Complaint } from '../types';
import { mockMenuItems, generateMockOrders } from '../data/mockData';

interface StudentViewProps {
  complaints: Complaint[];
  onSubmitComplaint: (complaint: Omit<Complaint, 'id' | 'submittedAt' | 'status'>) => void;
}

export function StudentView({ complaints, onSubmitComplaint }: StudentViewProps) {
  const [activeTab, setActiveTab] = useState<'menu' | 'cart' | 'orders' | 'complaints'>('menu');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(generateMockOrders());
  const [menuItems] = useState(mockMenuItems);

  const addToCart = (item: OrderItem) => {
    const existingItem = cart.find(i => i.menuItem.id === item.menuItem.id);
    if (existingItem) {
      setCart(cart.map(i => 
        i.menuItem.id === item.menuItem.id 
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      ));
    } else {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(i => i.menuItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(i => 
        i.menuItem.id === itemId 
          ? { ...i, quantity }
          : i
      ));
    }
  };

  const placeOrder = (order: Order) => {
    setOrders([...orders, order]);
    setCart([]);
    setActiveTab('orders');
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'menu'
              ? 'border-orange-500 text-orange-500'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <UtensilsCrossed className="w-5 h-5" />
          Menu
        </button>
        <button
          onClick={() => setActiveTab('cart')}
          className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors relative ${
            activeTab === 'cart'
              ? 'border-orange-500 text-orange-500'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          Cart
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-orange-500 text-orange-500'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Receipt className="w-5 h-5" />
          My Orders
          {orders.length > 0 && (
            <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-0.5">
              {orders.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('complaints')}
          className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'complaints'
              ? 'border-orange-500 text-orange-500'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          Review Complaints
          {complaints.length > 0 && (
            <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-0.5">
              {complaints.length}
            </span>
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'menu' && (
        <MenuBrowser 
          menuItems={menuItems} 
          onAddToCart={addToCart}
        />
      )}
      {activeTab === 'cart' && (
        <OrderCart 
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onPlaceOrder={placeOrder}
        />
      )}
      {activeTab === 'orders' && (
        <MyOrders orders={orders} />
      )}
      {activeTab === 'complaints' && (
        <ReviewComplaint complaints={complaints} onSubmitComplaint={onSubmitComplaint} />
      )}

      {/* Rush Hour Chatbot */}
      <RushHourChatbot orders={orders} />
    </div>
  );
}