export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  available: boolean;
  stock: number;
  prepTime: number; // in minutes
  image: string;
  description: string;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  token: string;
  studentName: string;
  items: OrderItem[];
  totalPrice: number;
  pickupTime: Date;
  orderTime: Date;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  isGroupOrder: boolean;
  groupMembers?: string[];
}

export interface DailyAnalytics {
  date: string;
  totalOrders: number;
  totalRevenue: number;
  peakHours: { hour: string; orders: number }[];
  popularItems: { name: string; count: number }[];
  averageWaitTime: number;
}

export interface Complaint {
  id: string;
  type: 'food-quality' | 'food-poisoning' | 'harassment';
  studentName: string;
  orderToken?: string;
  description: string;
  proofImages: string[];
  harassmentTarget?: 'student' | 'staff';
  status: 'pending' | 'under-review' | 'resolved';
  submittedAt: Date;
  resolvedAt?: Date;
  resolution?: string;
}