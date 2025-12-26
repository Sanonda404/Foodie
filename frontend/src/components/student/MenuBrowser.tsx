import { useState } from 'react';
import { MenuItem, OrderItem } from '../../types';
import { Plus, Search, AlertCircle, Clock } from 'lucide-react';

interface MenuBrowserProps {
  menuItems: MenuItem[];
  onAddToCart: (item: OrderItem) => void;
}

export function MenuBrowser({ menuItems, onAddToCart }: MenuBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-orange-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className={`bg-white rounded-lg shadow-sm border overflow-hidden transition-all hover:shadow-md ${
              !item.available ? 'opacity-60' : ''
            }`}
          >
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {!item.available && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-lg">
                    Out of Stock
                  </span>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-600">{item.prepTime} min</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-900">{item.name}</h3>
                <span className="text-orange-500">₹{item.price}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm">
                  {item.stock < 10 && item.available ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      <span className="text-amber-500">Only {item.stock} left</span>
                    </>
                  ) : (
                    <span className="text-gray-500">{item.stock} available</span>
                  )}
                </div>
                
                <button
                  onClick={() => onAddToCart({ menuItem: item, quantity: 1 })}
                  disabled={!item.available}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    item.available
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No items found</p>
        </div>
      )}
    </div>
  );
}