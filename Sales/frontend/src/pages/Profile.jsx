import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { token } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await fetch(
          "http://localhost:4000/api/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const itemRes = await fetch(
          "http://localhost:4000/api/items/mine",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!userRes.ok || !itemRes.ok) {
          throw new Error("Data ophalen mislukt");
        }

        setUser(await userRes.json());
        setItems(await itemRes.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `http://localhost:4000/api/items/${editingItem._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingItem),
      }
    );

    const updated = await res.json();

    setItems((prev) =>
      prev.map((item) =>
        item._id === updated._id ? updated : item
      )
    );

    setEditingItem(null);
  };

  if (!token) {
    return <div className="text-gray-400 text-center mt-20">Log in</div>;
  }

  if (loading) {
    return <div className="text-gray-400 text-center mt-20">Laden...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-center mt-20">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 p-6">
      {/* PROFIEL */}
      <div className="max-w-md mx-auto bg-zinc-900 p-6 rounded-xl">
        <h1 className="text-2xl font-bold text-purple-400 text-center">
          Mijn profiel
        </h1>
        <p className="mt-4">{user.username}</p>
        <p className="text-gray-400">{user.email}</p>
      </div>

      {/* ITEMS */}
      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-xl font-bold text-purple-400 mb-4">
          Mijn items
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-zinc-900 rounded-xl">
              {item.images?.[0] && (
                <img
                  src={`http://localhost:4000${item.images[0]}`}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-4">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
                <p className="text-purple-400 font-bold">€ {item.price}</p>

                <button
                  onClick={() => setEditingItem(item)}
                  className="text-sm text-purple-400 mt-2"
                >
                  Bewerken
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✏️ BEWERKMODUS */}
      {editingItem && (
        <form
          onSubmit={handleUpdate}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl mb-4">Item bewerken</h2>

            <input
              className="w-full mb-2 p-2 bg-zinc-800"
              value={editingItem.title}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  title: e.target.value,
                })
              }
            />

            <textarea
              className="w-full mb-2 p-2 bg-zinc-800"
              value={editingItem.description}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  description: e.target.value,
                })
              }
            />

            <input
              type="number"
              className="w-full mb-4 p-2 bg-zinc-800"
              value={editingItem.price}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  price: e.target.value,
                })
              }
            />

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-gray-400"
              >
                Annuleren
              </button>

              <button
                type="submit"
                className="bg-purple-600 px-4 py-2 rounded"
              >
                Opslaan
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
