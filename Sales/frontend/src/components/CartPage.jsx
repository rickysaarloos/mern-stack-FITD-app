import { useCart } from "../context/CartContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, i) => acc + i.price, 0);

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        await fetch(`http://localhost:4000/api/items/${item.id}/buy`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      toast.success("Aankoop succesvol 🎉");
      clearCart();
      navigate("/purchases");
    } catch {
      toast.error("Aankoop mislukt");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-zinc-900 rounded-2xl text-white">
      <h2 className="font-serif text-3xl mb-6">Shopping cart</h2>

      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between border-b py-3">
          <span>{item.title}</span>
          <span>€{item.price}</span>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-400 hover:text-red-300"
          >
            Remove
          </button>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div className="mt-6">
          <p className="mb-4">Total: €{total}</p>
          <button
            onClick={handleCheckout}
            className="bg-[#7A1E16] px-6 py-3 rounded-full uppercase"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
