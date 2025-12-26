import { useState } from "react";
import api from "../../api";
import { MenuItem } from "../types";

const categories = ["MainCourse", "Beverages", "Snacks", "Desserts"];

export default function AddFoodPage() {
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

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.category || newItem.price <= 0) alert("invalid details");

    try {
      const res = await api.post("/add-food",newItem);
      alert("Food item added successfully!");
      // Optionally redirect back to menu page
      console.log(res)
    } catch (err) {
      console.error("Failed to add item:", err);
      alert("Failed to add item");
    }
    
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Add Food Item</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Name</label>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Description</label>
          <textarea
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            rows={3}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Category</label>
          <select
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">Image URL</label>
          <input
            type="text"
            value={newItem.image}
            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Price (₹)</label>
            <input
              type="number"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Prep Time (min)</label>
            <input
              type="number"
              value={newItem.prepTime}
              onChange={(e) =>
                setNewItem({ ...newItem, prepTime: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleAddItem}
        className="cursor-pointer mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
      >
        Add Item
      </button>
    </div>
  );
}