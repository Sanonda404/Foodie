import { MenuItem, Order } from '../types';

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Burger',
    category: 'Main Course',
    price: 120,
    available: true,
    stock: 25,
    prepTime: 8,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce'
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    category: 'Main Course',
    price: 180,
    available: true,
    stock: 15,
    prepTime: 12,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    description: 'Fresh mozzarella, basil, and tomato sauce'
  },
  {
    id: '3',
    name: 'Chicken Biryani',
    category: 'Main Course',
    price: 150,
    available: true,
    stock: 20,
    prepTime: 10,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    description: 'Aromatic basmati rice with tender chicken pieces'
  },
  {
    id: '4',
    name: 'Veg Sandwich',
    category: 'Snacks',
    price: 60,
    available: true,
    stock: 30,
    prepTime: 5,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
    description: 'Grilled sandwich with fresh vegetables and cheese'
  },
  {
    id: '5',
    name: 'Pasta Alfredo',
    category: 'Main Course',
    price: 140,
    available: true,
    stock: 18,
    prepTime: 10,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    description: 'Creamy white sauce pasta with herbs'
  },
  {
    id: '6',
    name: 'French Fries',
    category: 'Snacks',
    price: 50,
    available: true,
    stock: 40,
    prepTime: 6,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    description: 'Crispy golden fries with seasoning'
  },
  {
    id: '7',
    name: 'Masala Dosa',
    category: 'Main Course',
    price: 80,
    available: true,
    stock: 22,
    prepTime: 8,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop',
    description: 'South Indian crispy dosa with potato filling'
  },
  {
    id: '8',
    name: 'Cold Coffee',
    category: 'Beverages',
    price: 70,
    available: true,
    stock: 35,
    prepTime: 3,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    description: 'Chilled coffee with milk and ice cream'
  },
  {
    id: '9',
    name: 'Mango Smoothie',
    category: 'Beverages',
    price: 80,
    available: true,
    stock: 25,
    prepTime: 4,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop',
    description: 'Fresh mango blended with yogurt and honey'
  },
  {
    id: '10',
    name: 'Chocolate Brownie',
    category: 'Desserts',
    price: 60,
    available: true,
    stock: 20,
    prepTime: 2,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    description: 'Rich chocolate brownie with nuts'
  },
  {
    id: '11',
    name: 'Spring Rolls',
    category: 'Snacks',
    price: 90,
    available: false,
    stock: 0,
    prepTime: 7,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400&h=300&fit=crop',
    description: 'Crispy vegetable spring rolls'
  },
  {
    id: '12',
    name: 'Fresh Lime Soda',
    category: 'Beverages',
    price: 40,
    available: true,
    stock: 50,
    prepTime: 2,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
    description: 'Refreshing lime soda with mint'
  }
];

export const generateMockOrders = (): Order[] => {
  const now = new Date();
  const orders: Order[] = [];
  
  // Generate some sample orders
  const sampleOrders = [
    {
      studentName: 'Rahul Kumar',
      items: [{ menuItem: mockMenuItems[0], quantity: 1 }, { menuItem: mockMenuItems[5], quantity: 1 }],
      pickupTime: new Date(now.getTime() + 15 * 60000),
      orderTime: new Date(now.getTime() - 5 * 60000),
      status: 'preparing' as const
    },
    {
      studentName: 'Priya Sharma',
      items: [{ menuItem: mockMenuItems[2], quantity: 1 }],
      pickupTime: new Date(now.getTime() + 20 * 60000),
      orderTime: new Date(now.getTime() - 3 * 60000),
      status: 'pending' as const
    },
    {
      studentName: 'Amit Patel',
      items: [{ menuItem: mockMenuItems[1], quantity: 2 }],
      pickupTime: new Date(now.getTime() + 10 * 60000),
      orderTime: new Date(now.getTime() - 8 * 60000),
      status: 'ready' as const
    }
  ];

  sampleOrders.forEach((order, index) => {
    const totalPrice = order.items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
    orders.push({
      id: `ORD${String(index + 1).padStart(3, '0')}`,
      token: `T${String(100 + index)}`,
      ...order,
      totalPrice,
      isGroupOrder: false
    });
  });

  return orders;
};
