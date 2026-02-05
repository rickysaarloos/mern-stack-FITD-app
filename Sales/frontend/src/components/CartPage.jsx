import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    toast.success("Checkout succesvol! Dank voor je aankoop.");
    clearCart();
  };

  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-zinc-900 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6">Winkelwagen</h2>

      {cartItems.length === 0 && <p className="text-gray-400">Je cart is leeg.</p>}

      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-700">
          <span>{item.title}</span>
          <span>{item.price.toFixed(2)} €</span>
          <button
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            onClick={() => {
              removeFromCart(item.id);
              toast.info(`${item.title} verwijderd uit cart`);
            }}
          >
            Verwijderen
          </button>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Totaal: {total.toFixed(2)} €</h3>
          <button
            className="bg-green-600 px-6 py-2 rounded hover:bg-green-700 transition"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
