import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/items");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Fout bij ophalen items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-300">Items laden...</p>;
  if (items.length === 0) return <p className="text-center mt-10 text-gray-300">Geen items gevonden.</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
