import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ItemCard = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id: item._id, title: item.title, price: item.price });
    toast.success(`${item.title} toegevoegd aan cart!`);
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-xl shadow-md text-white flex flex-col justify-between">
      <h2 className="text-lg font-bold mb-2">{item.title}</h2>
      <p className="text-gray-300 mb-4">€{item.price}</p>

      <span
        className={`px-2 py-1 text-sm rounded-full mb-2 ${
          item.status === "te koop" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {item.status}
      </span>

      <button
        onClick={handleAddToCart}
        className="bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded"
        disabled={item.status === "verkocht"}
      >
        {item.status === "verkocht" ? "Niet beschikbaar" : "Toevoegen aan cart"}
      </button>
    </div>
  );
};

export default ItemCard;
