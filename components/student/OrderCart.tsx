import { useState } from 'react';
import { OrderItem, Order } from '../../types';
import { Minus, Plus, Trash2, Clock, Users, ShoppingBag } from 'lucide-react';

interface OrderCartProps {
  cart: OrderItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onPlaceOrder: (order: Order) => void;
}

export function OrderCart({ cart, onUpdateQuantity, onRemoveItem, onPlaceOrder }: OrderCartProps) {
  const [studentName, setStudentName] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [isGroupOrder, setIsGroupOrder] = useState(false);
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [newMember, setNewMember] = useState('');

  const totalPrice = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const estimatedPrepTime = Math.max(...cart.map(item => item.menuItem.prepTime), 0);

  const handlePlaceOrder = () => {
    if (!studentName.trim() || !pickupTime) {
      alert('Please enter your name and select a pickup time');
      return;
    }

    const pickupDateTime = new Date(pickupTime);
    const now = new Date();
    
    if (pickupDateTime <= now) {
      alert('Pickup time must be in the future');
      return;
    }

    const order: Order = {
      id: `ORD${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      token: `T${Math.floor(100 + Math.random() * 900)}`,
      studentName,
      items: cart,
      totalPrice,
      pickupTime: pickupDateTime,
      orderTime: new Date(),
      status: 'pending',
      isGroupOrder,
      groupMembers: isGroupOrder ? groupMembers : undefined
    };

    onPlaceOrder(order);
    setStudentName('');
    setPickupTime('');
    setIsGroupOrder(false);
    setGroupMembers([]);
  };

  const addGroupMember = () => {
    if (newMember.trim() && !groupMembers.includes(newMember.trim())) {
      setGroupMembers([...groupMembers, newMember.trim()]);
      setNewMember('');
    }
  };

  const removeGroupMember = (member: string) => {
    setGroupMembers(groupMembers.filter(m => m !== member));
  };

  // Generate pickup time options (next 2 hours in 15-minute intervals)
  const getPickupTimeOptions = () => {
    const options = [];
    const now = new Date();
    const minTime = new Date(now.getTime() + (estimatedPrepTime + 5) * 60000); // prep time + 5 min buffer
    
    for (let i = 0; i < 8; i++) {
      const time = new Date(minTime.getTime() + i * 15 * 60000);
      options.push(time);
    }
    return options;
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-gray-500 mb-2">Your cart is empty</h3>
        <p className="text-gray-400 text-sm">Add items from the menu to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-gray-900">Cart Items</h2>
        
        {cart.map(item => (
          <div key={item.menuItem.id} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex gap-4">
              <img
                src={item.menuItem.image}
                alt={item.menuItem.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-gray-900">{item.menuItem.name}</h3>
                    <p className="text-gray-500 text-sm">{item.menuItem.category}</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.menuItem.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-gray-900 w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-orange-500 bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <span className="text-orange-500">
                    ₹{item.menuItem.price * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Details */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
          <h3 className="text-gray-900 mb-4">Order Details</h3>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pickup Time
              </label>
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select time</option>
                {getPickupTimeOptions().map((time, index) => (
                  <option key={index} value={time.toISOString()}>
                    {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Estimated prep time: {estimatedPrepTime} min
              </p>
            </div>

            {/* Group Order */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGroupOrder}
                  onChange={(e) => setIsGroupOrder(e.target.checked)}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700 flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Group Order
                </span>
              </label>
            </div>

            {isGroupOrder && (
              <div className="pl-6 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addGroupMember()}
                    placeholder="Add member name"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    onClick={addGroupMember}
                    className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm"
                  >
                    Add
                  </button>
                </div>
                {groupMembers.length > 0 && (
                  <div className="space-y-1">
                    {groupMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-2 py-1 rounded text-sm">
                        <span className="text-gray-700">{member}</span>
                        <button
                          onClick={() => removeGroupMember(member)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-t pt-4 space-y-2 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Total</span>
              <span className="text-orange-500">₹{totalPrice}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}