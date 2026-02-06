import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const FloatingCart = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/cart")}
      className="
        fixed
        bottom-6
        right-6
        z-50
        h-12
        w-12
        rounded-full
        bg-zinc-900
        border
        border-zinc-800
        flex
        items-center
        justify-center
        hover:bg-zinc-800
        transition
      "
      aria-label="Shopping cart"
    >
      <ShoppingBag className="h-5 w-5 text-gray-200" />

      {cartItems.length > 0 && (
        <span
          className="
            absolute
            -top-1
            -right-1
            h-5
            min-w-[20px]
            px-1
            rounded-full
            bg-[#7A1E16]
            text-[10px]
            font-semibold
            flex
            items-center
            justify-center
            text-white
          "
        >
          {cartItems.length}
        </span>
      )}
    </button>
  );
};

export default FloatingCart;
