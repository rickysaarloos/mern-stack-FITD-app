import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Notifications() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/notifications/mine",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Meldingen ophalen mislukt");
        }

        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  const markAsRead = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Melding bijwerken mislukt");
      }

      const updated = await res.json();
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === updated._id ? updated : notification
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-gray-400">
        Meldingen laden…
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
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/profile")}
          className="text-sm uppercase tracking-widest text-gray-400 hover:text-white mb-10"
        >
          ← Profile
        </button>

        <div className="flex items-center justify-between mb-10">
          <h1 className="font-serif text-4xl font-light">Meldingen</h1>
          <span className="text-sm uppercase tracking-widest text-gray-500">
            {notifications.filter((notification) => !notification.read).length} ongelezen
          </span>
        </div>

        {notifications.length === 0 && (
          <p className="text-gray-500">Nog geen meldingen.</p>
        )}

        <div className="space-y-6">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`flex flex-col gap-3 rounded-2xl p-6 border ${
                notification.read
                  ? "border-transparent bg-zinc-900/50"
                  : "border-[#7A1E16] bg-zinc-900"
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-lg font-light">{notification.message}</p>
                  <p className="text-sm text-gray-400">
                    Item: {notification.item?.title ?? "Onbekend"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Buyer: {notification.buyer?.username ?? "Onbekend"}
                  </p>
                </div>

                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification._id)}
                    className="text-xs uppercase tracking-widest text-[#7A1E16] hover:text-white"
                  >
                    Markeer als gelezen
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;