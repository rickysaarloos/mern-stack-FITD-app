import { useContext } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const ItemCard = ({ item }) => {
  const { addToCart, cartItems } = useCart();
   const { user } = useContext(AuthContext);

  const alreadyInCart = cartItems.some(
    (cartItem) => cartItem.id === item._id
  );

  const isOwnItem = user && item.seller?._id === user._id;

  const handleAddToCart = () => {
        if (isOwnItem) {
      toast.info("Je kan je eigen listing niet in je cart zetten");
      return;
    }

    if (alreadyInCart) {
      toast.info("Dit item zit al in je cart");
      return;
    } 

    addToCart({
      id: item._id,
      title: item.title,
      price: item.price,
    });

    toast.success(`${item.title} toegevoegd aan cart`);
  };

  return (
    <div className="group bg-zinc-950">
      {/* IMAGE */}
      {item.images?.[0] && (
        <div className="overflow-hidden rounded-3xl mb-4">
          <img
            src={`http://localhost:4000${item.images[0]}`}
            alt={item.title}
            className="h-96 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="space-y-2">
        <h3 className="font-serif text-xl font-light leading-tight">
          {item.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-1">
          {item.description}
        </p>

        <div className="flex justify-between items-center pt-2 text-sm uppercase tracking-widest">
          <span className="text-[#7A1E16]">€ {item.price}</span>

          <span
            className={`text-xs ${
              item.status === "verkocht"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {item.status}
          </span>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleAddToCart}
                 disabled={item.status === "verkocht" || alreadyInCart || isOwnItem}
          className={`
            mt-4
            w-full
            px-6
            py-3
            rounded-full
            text-sm
            uppercase
            tracking-widest
            transition
            ${ 
              item.status === "verkocht" || alreadyInCart || isOwnItem
                ? "border border-gray-700 text-gray-500 cursor-not-allowed"
                : "border border-[#7A1E16] text-[#7A1E16] hover:bg-[#7A1E16] hover:text-white"
            }
          `}
        >
          {item.status === "verkocht"
            ? "Niet beschikbaar"
            : isOwnItem
            ? "Eigen listing"
            : alreadyInCart
            ? "Al in cart"
            : "Add to cart"}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
