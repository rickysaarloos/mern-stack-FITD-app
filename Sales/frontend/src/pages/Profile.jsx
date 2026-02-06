import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingItemId, setEditingItemId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
  });

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const userRes = await fetch("http://localhost:4000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) throw new Error("Gebruiker ophalen mislukt");
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

  const handleDelete = async (id) => {
    if (!window.confirm("Item verwijderen?")) return;

    const res = await fetch(`http://localhost:4000/api/items/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setItems((prev) => prev.filter((item) => item._id !== id));
    }
  };

  const startEdit = (item) => {
    setEditingItemId(item._id);
    setEditForm({
      title: item.title,
      description: item.description,
      price: item.price,
      brand: item.brand || "",
    });
  };

  const cancelEdit = () => {
    setEditingItemId(null);
    setEditForm({ title: "", description: "", price: "", brand: "" });
  };

  const saveEdit = async (id) => {
    const res = await fetch(`http://localhost:4000/api/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editForm),
    });

    if (res.ok) {
      const updated = await res.json();
      setItems((prev) =>
        prev.map((item) => (item._id === id ? updated : item))
      );
      cancelEdit();
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-gray-400">
        Log in om je profiel te bekijken
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-gray-400">
        Profiel laden…
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

        {/* NAV */}
        <button
          onClick={() => navigate("/")}
          className="text-sm uppercase tracking-widest text-gray-400 hover:text-white mb-10"
        >
          ← Home
        </button>

   {/* PROFILE HEADER */}
<div className="mb-16 flex items-start justify-between">
  <div>
    <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-4">
      Profile
    </p>

    <h1 className="font-serif text-5xl font-light mb-6">
      {user.username}
    </h1>

    <p className="text-gray-400">{user.email}</p>
  </div>

  <div className="flex gap-4 mt-2">
  {/* LIST ITEM */}
  <button
    onClick={() => navigate("/items/new")}
    className="
      bg-[#7A1E16]
      hover:bg-[#8B1D18]
      transition
      px-8
      py-4
      rounded-full
      text-sm
      uppercase
      tracking-widest
    "
  >
    List item
  </button>

  {/* MY SALES */}
  <button
    onClick={() => navigate("/sales")}
    className="
      border
      border-gray-600
      hover:border-white
      transition
      px-8
      py-4
      rounded-full
      text-sm
      uppercase
      tracking-widest
      text-gray-300
    "
  >
    My sales
  </button>
     <button
    onClick={() => navigate("/notifications")}
    className="
      border
      border-gray-600
      hover:border-white
      transition
      px-8
      py-4
      rounded-full
      text-sm
      uppercase
      tracking-widest
      text-gray-300
    "
  >
    Notifications
  </button>

  <button
  onClick={() => navigate("/purchases")}
  className="text-sm uppercase tracking-widest text-gray-400 hover:text-white"
>
  My purchases
</button>

</div>

</div>


        {/* ITEMS */}
        <h2 className="font-serif text-3xl font-light mb-10">
          My listings
        </h2>

        {items.length === 0 && (
          <p className="text-gray-500">Nog geen items geplaatst.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {items.map((item) => (
            <div key={item._id} className="group">
              {item.images?.length > 0 && (
                <img
                  src={`http://localhost:4000${item.images[0]}`}
                  alt={item.title}
                  className="h-80 w-full object-cover rounded-3xl mb-4"
                />
              )}

              {editingItemId === item._id ? (
                <div className="space-y-3">
                  <input
                    className="w-full bg-zinc-900 p-3 rounded-xl"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />

                  <textarea
                    className="w-full bg-zinc-900 p-3 rounded-xl"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    className="w-full bg-zinc-900 p-3 rounded-xl"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                  />

                  <input
                    className="w-full bg-zinc-900 p-3 rounded-xl"
                    placeholder="Brand"
                    value={editForm.brand}
                    onChange={(e) =>
                      setEditForm({ ...editForm, brand: e.target.value })
                    }
                  />

                  <div className="flex justify-between text-sm uppercase tracking-widest">
                    <button
                      onClick={() => saveEdit(item._id)}
                      className="text-green-400"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-xl mb-1">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center mt-4 text-sm uppercase tracking-widest">
                    <span className="text-[#7A1E16]">€ {item.price}</span>

                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => startEdit(item)}
                        className="text-gray-400 hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
