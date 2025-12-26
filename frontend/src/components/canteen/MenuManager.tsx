import { useState } from "react";
import { MenuItem } from "../../types";
import { Edit2, ToggleLeft, ToggleRight, Package, Plus } from "lucide-react";

interface MenuManagerProps {
  menuItems: MenuItem[];
  onUpdateItem: (item: MenuItem) => void;
  onAddItem: (item: MenuItem) => void;
}

export function MenuManager({
  menuItems,
  onUpdateItem,
  onAddItem,
}: MenuManagerProps) {
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(menuItems.map((item) => item.category))),
  ];

  // Initial state for new menu item
  const [newItem, setNewItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    category: "",
    price: 0,
    description: "",
    prepTime: 10,
    stock: 50,
    available: true,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
  });

  const filteredItems =
    filterCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === filterCategory);

  const handleToggleAvailability = (item: MenuItem) => {
    onUpdateItem({
      ...item,
      available: !item.available,
    });
  };

  const handleUpdateStock = (item: MenuItem, newStock: number) => {
    onUpdateItem({
      ...item,
      stock: Math.max(0, newStock),
      available: newStock > 0 ? item.available : false,
    });
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      onUpdateItem(editingItem);
      setEditingItem(null);
    }
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.price > 0) {
      onAddItem({
        ...newItem,
        id: Date.now().toString(), // Generate a unique ID
      });
      setIsCreating(false);
      setNewItem({
        name: "",
        category: "",
        price: 0,
        description: "",
        prepTime: 10,
        stock: 50,
        available: true,
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900">Menu Manager</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              filterCategory === category
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
                : "bg-white border border-gray-300 text-gray-700 hover:border-purple-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-lg shadow-sm border p-6 ${
              !item.available ? "opacity-60" : ""
            }`}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full md:w-32 h-32 object-cover rounded-lg"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.category}</p>
                  </div>
                  <span className="text-orange-500">₹{item.price}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                <div className="grid md:grid-cols-3 gap-4">
                  {/* Stock Management */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">
                      Stock Level
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateStock(item, item.stock - 5)}
                        className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{item.stock}</span>
                      </div>
                      <button
                        onClick={() => handleUpdateStock(item, item.stock + 5)}
                        className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Prep Time */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">
                      Prep Time
                    </label>
                    <div className="text-gray-900">{item.prepTime} minutes</div>
                  </div>

                  {/* Availability Toggle */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">
                      Availability
                    </label>
                    <button
                      onClick={() => handleToggleAvailability(item)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        item.available
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.available ? (
                        <>
                          <ToggleRight className="w-5 h-5" />
                          Available
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-5 h-5" />
                          Unavailable
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex md:flex-col gap-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-gray-900 mb-4">Edit Menu Item</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={editingItem.price}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Prep Time (min)
                  </label>
                  <input
                    type="number"
                    value={editingItem.prepTime}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        prepTime: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleSaveEdit}
                className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingItem(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-gray-900 mb-4">Add Menu Item</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  placeholder="e.g., Main Course, Beverages, Snacks"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={newItem.image}
                  onChange={(e) =>
                    setNewItem({ ...newItem, image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Prep Time (min)
                  </label>
                  <input
                    type="number"
                    value={newItem.prepTime}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        prepTime: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleAddItem}
                className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
              >
                Add Item
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
