import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { token } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    // 👤 gebruiker ophalen
    fetch("http://localhost:4000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));

    // 📦 items van gebruiker ophalen
    fetch("http://localhost:4000/api/items/mine", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setItems(data))
      .finally(() => setLoading(false));
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Log in om je profiel te bekijken
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Profiel laden...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 p-6">
      {/* PROFIEL */}
      <div className="max-w-md mx-auto bg-zinc-900 p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-purple-400 text-center">
          Mijn profiel
        </h1>

        <div className="mt-6 space-y-3">
          <p>
            <span className="text-gray-400">Gebruikersnaam:</span>{" "}
            <span className="font-semibold">{user?.username}</span>
          </p>

          <p>
            <span className="text-gray-400">Email:</span>{" "}
            <span className="font-semibold">{user?.email}</span>
          </p>
        </div>
      </div>

      {/* ITEMS */}
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-bold text-purple-400 mb-4">
          Mijn items
        </h2>

        {items.length === 0 && (
          <p className="text-gray-500">Je hebt nog geen items geplaatst.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-zinc-900 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                {item.description}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-purple-400 font-bold">
                  € {item.price}
                </span>

                <span className="text-xs text-gray-500">
                  {item.status === "verkocht" ? "Verkocht" : "Te koop"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
