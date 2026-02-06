import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Purchases() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [purchases, setPurchases] = useState([]);
  const [reviewedItemIds, setReviewedItemIds] = useState(new Set());
  const [reviewForms, setReviewForms] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const [purchaseRes, reviewRes] = await Promise.all([
          fetch("http://localhost:4000/api/items/purchases/mine", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:4000/api/reviews/mine/item-ids", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (!purchaseRes.ok) {
          throw new Error("Aankopen ophalen mislukt");
        }

        if (!reviewRes.ok) {
          throw new Error("Reviews ophalen mislukt");
        }

        const purchaseData = await purchaseRes.json();
        const reviewData = await reviewRes.json();

        setPurchases(purchaseData);
        setReviewedItemIds(new Set(reviewData));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [token]);

  const updateForm = (itemId, key, value) => {
    setReviewForms((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || { rating: 5, comment: "", submitting: false }),
        [key]: value,
      },
    }));
  };

  const submitReview = async (itemId) => {
    const currentForm = reviewForms[itemId] || { rating: 5, comment: "" };

    updateForm(itemId, "submitting", true);

    try {
      const res = await fetch("http://localhost:4000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemId,
          rating: Number(currentForm.rating || 5),
          comment: currentForm.comment || "",
        }),
      });

      if (!res.ok) {
        const errBody = await res.json();
        throw new Error(errBody.message || "Review plaatsen mislukt");
      }

      setReviewedItemIds((prev) => {
        const next = new Set(prev);
        next.add(itemId);
        return next;
      });

      updateForm(itemId, "comment", "");
    } catch (err) {
      updateForm(itemId, "error", err.message);
    } finally {
      updateForm(itemId, "submitting", false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-gray-400 flex items-center justify-center">
        Aankopen laden…
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
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/profile")}
          className="text-sm uppercase tracking-widest text-gray-400 hover:text-white mb-10"
        >
          ← Profile
        </button>

        <h1 className="font-serif text-4xl font-light mb-12">My purchases</h1>

        {purchases.length === 0 && (
          <p className="text-gray-500">Je hebt nog geen aankopen.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {purchases.map((item) => {
            const form = reviewForms[item._id] || {
              rating: 5,
              comment: "",
              submitting: false,
            };

            const hasReview = reviewedItemIds.has(item._id);

            return (
              <div key={item._id} className="bg-zinc-900/50 p-4 rounded-2xl">
                {item.images?.[0] && (
                  <img
                    src={`http://localhost:4000${item.images[0]}`}
                    alt={item.title}
                    className="h-72 w-full object-cover rounded-3xl mb-4"
                  />
                )}

                <h3 className="font-serif text-xl mb-1">{item.title}</h3>

                <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>

                <div className="mt-4 text-sm uppercase tracking-widest flex justify-between mb-4">
                  <span className="text-[#7A1E16]">€ {item.price}</span>
                  <span className="text-gray-500">
                    Seller: {item.seller?.username ?? "Onbekend"}
                  </span>
                </div>

                {hasReview ? (
                  <p className="text-green-400 text-sm">✅ Review geplaatst</p>
                ) : (
                  <div className="space-y-3 border-t border-zinc-800 pt-4">
                    <p className="text-xs uppercase tracking-widest text-gray-400">
                      Laat een review achter
                    </p>

                    <select
                      value={form.rating}
                      onChange={(e) => updateForm(item._id, "rating", e.target.value)}
                      className="w-full bg-zinc-950 rounded-lg p-2"
                    >
                      {[5, 4, 3, 2, 1].map((value) => (
                        <option key={value} value={value}>
                          {value} ster{value > 1 ? "ren" : ""}
                        </option>
                      ))}
                    </select>

                    <textarea
                      value={form.comment}
                      onChange={(e) => updateForm(item._id, "comment", e.target.value)}
                      placeholder="Hoe was je ervaring met deze verkoper?"
                      className="w-full bg-zinc-950 rounded-lg p-2 min-h-24"
                    />

                    {form.error && <p className="text-red-400 text-sm">{form.error}</p>}

                    <button
                      onClick={() => submitReview(item._id)}
                      disabled={form.submitting}
                      className="bg-[#7A1E16] hover:bg-[#8B1D18] transition px-5 py-2 rounded-full text-xs uppercase tracking-widest disabled:opacity-60"
                    >
                      {form.submitting ? "Versturen…" : "Review plaatsen"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Purchases;