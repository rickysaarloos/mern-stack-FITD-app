import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

function Home() {
  const { token, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-gray-200">
      <div className="w-full max-w-md bg-zinc-900 p-6 rounded-2xl shadow-xl text-center">

        <h1 className="text-2xl font-bold text-purple-400">
          FITD 👕
        </h1>

        <p className="text-gray-400 mt-2">
          Koop & verkoop kleding
        </p>

        {!token ? (
          <>
            <p className="mt-4 text-gray-400">
              Log in om kleding te verkopen
            </p>

            <div className="mt-4 flex gap-3 justify-center">
              <Link
                to="/login"
                className="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-600"
              >
                Inloggen
              </Link>

              <Link
                to="/register"
                className="border border-purple-500 px-4 py-2 rounded-lg hover:bg-purple-900"
              >
                Registreren
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="mt-4 text-green-400">
              Je bent ingelogd ✅
            </p>

            <Link
              to="/items/new"
              className="mt-4 block bg-green-600 hover:bg-green-500 py-2 rounded-lg"
            >
              ➕ Item plaatsen
            </Link>

            <Link
              to="/profile"
              className="mt-3 inline-block text-purple-400 hover:underline"
            >
              Naar mijn profiel
            </Link>

            <button
              onClick={logout}
              className="mt-4 w-full bg-purple-700 hover:bg-purple-600 py-2 rounded-lg"
            >
              Uitloggen
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Home;