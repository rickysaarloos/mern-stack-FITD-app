import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Purchases() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchPurchases = async () => {
      const res = await fetch(
        "http://localhost:4000/api/items/purchases/mine",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setPurchases(data);
      setLoading(false);
    };

    fetchPurchases();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-gray-400 flex items-center justify-center">
        Aankopen laden…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 px-10 py-12">
      <div className="max-w-7xl mx-auto">

        <button
          onClick={() => navigate("/profile")}
          className="text-sm uppercase tracking-widest text-gray-400 hover:text-white mb-10"
        >
          ← Profile
        </button>

        <h1 className="font-serif text-4xl font-light mb-12">
          My purchases
        </h1>

        {purchases.length === 0 && (
          <p className="text-gray-500">Je hebt nog geen aankopen.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {purchases.map((item) => (
            <div key={item._id}>
              {item.images?.length > 0 && (
                <img
                  src={`http://localhost:4000${item.images[0]}`}
                  alt={item.title}
                  className="h-80 w-full object-cover rounded-3xl mb-4"
                />
              )}

              <h3 className="font-serif text-xl mb-1">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm line-clamp-2">
                {item.description}
              </p>

              <div className="mt-4 text-sm uppercase tracking-widest flex justify-between">
                <span className="text-[#7A1E16]">€ {item.price}</span>
                <span className="text-gray-500">
                  Seller: {item.seller?.username}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Purchases;
