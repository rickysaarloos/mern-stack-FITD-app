import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Sales() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/items/sales/mine",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Verkopen ophalen mislukt");
        }

        const data = await res.json();
        setSales(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-gray-400">
        Verkopen laden…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 px-10 py-12">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/profile")}
          className="text-sm uppercase tracking-widest text-gray-400 hover:text-white mb-10"
        >
          ← Profile
        </button>

        <h1 className="font-serif text-4xl font-light mb-12">
          My sales
        </h1>

        {sales.length === 0 && (
          <p className="text-gray-500">Nog geen verkopen.</p>
        )}

        <div className="space-y-6">
          {sales.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-zinc-900 rounded-2xl p-6"
            >
              <div>
                <h3 className="font-serif text-xl">{item.title}</h3>

                <p className="text-gray-400 text-sm">
                  Buyer: {item.buyer?.username ?? "Onbekend"}
                </p>

                <p className="text-gray-500 text-xs">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <span className="text-[#7A1E16] text-lg font-semibold">
                € {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sales;
