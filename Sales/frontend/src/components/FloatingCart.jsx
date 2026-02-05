import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const FloatingCart = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  return (
    <div
      className="fixed bottom-5 right-5 bg-purple-600 text-white p-3 rounded-full shadow-lg cursor-pointer flex items-center justify-center relative z-50"
      onClick={() => navigate("/cart")}
    >
      🛒
      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
          {cartItems.length}
        </span>
      )}
    </div>
  );
};

export default FloatingCart;
