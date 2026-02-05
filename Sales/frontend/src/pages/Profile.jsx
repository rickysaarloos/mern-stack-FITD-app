import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data); // check wat er terugkomt
        setUser(data); // data bevat nu het user object met username en email
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
    </div>
  );
}

export default Profile;
