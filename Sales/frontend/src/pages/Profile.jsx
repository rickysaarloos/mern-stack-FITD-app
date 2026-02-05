import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { token } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✏️ edit state
  const [editingItemId, setEditingItemId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
  });

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await fetch("http://localhost:4000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userRes.ok) throw new Error("User ophalen mislukt");
        setUser(await userRes.json());

        const itemRes = await fetch("http://localhost:4000/api/items/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!itemRes.ok) throw new Error("Items ophalen mislukt");
        setItems(await itemRes.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  /* 🗑️ ITEM VERWIJDEREN */
  const handleDelete = async (id) => {
    if (!window.confirm("Item verwijderen?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Verwijderen mislukt");

      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  /* ✏️ START BEWERKEN */
  const startEdit = (item) => {
    setEditingItemId(item._id);
    setEditForm({
      title: item.title,
      description: item.description,
      price: item.price,
      brand: item.brand || "",
    });
  };

  /* ❌ ANNULEREN */
  const cancelEdit = () => {
    setEditingItemId(null);
    setEditForm({
      title: "",
      description: "",
      price: "",
      brand: "",
    });
  };

  /* 💾 OPSLAAN */
  const saveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) throw new Error("Bewerken mislukt");

      const updatedItem = await res.json();

      setItems((prev) =>
        prev.map((item) => (item._id === id ? updatedItem : item))
      );

      cancelEdit();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!token) {
    return <div className="text-center mt-20 text-gray-400">Log in</div>;
  }

  if (loading) {
    return <div className="text-center mt-20 text-gray-400">Laden…</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-purple-400 mb-6">
          Mijn items
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-zinc-900 rounded-xl overflow-hidden shadow"
            >
              {item.images?.length > 0 && (
                <img
                  src={`http://localhost:4000${item.images[0]}`}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-4">
                {editingItemId === item._id ? (
                  <>
                    <input
                      className="w-full mb-2 bg-zinc-800 p-2 rounded"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                    />

                    <textarea
                      className="w-full mb-2 bg-zinc-800 p-2 rounded"
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                    />

                    <input
                      type="number"
                      className="w-full mb-2 bg-zinc-800 p-2 rounded"
                      value={editForm.price}
                      onChange={(e) =>
                        setEditForm({ ...editForm, price: e.target.value })
                      }
                    />

                    <input
                      className="w-full mb-3 bg-zinc-800 p-2 rounded"
                      placeholder="Merk"
                      value={editForm.brand}
                      onChange={(e) =>
                        setEditForm({ ...editForm, brand: e.target.value })
                      }
                    />

                    <div className="flex justify-between">
                      <button
                        onClick={() => saveEdit(item._id)}
                        className="text-green-400 text-sm"
                      >
                        Opslaan
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-400 text-sm"
                      >
                        Annuleren
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {item.description}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-purple-400 font-bold">
                        € {item.price}
                      </span>

                      <div className="flex gap-3 text-sm">
                        <button
                          onClick={() => startEdit(item)}
                          className="text-blue-400"
                        >
                          Bewerken
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-400"
                        >
                          Verwijderen
                        </button>
                      </div>
                    </div>

                    {item.brand && (
                      <p className="text-xs text-gray-500 mt-2">
                        Merk: {item.brand}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
