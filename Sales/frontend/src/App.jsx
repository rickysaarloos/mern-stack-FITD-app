import { useState } from "react";
import Login from "./components/login";
import Register from "./components/Register";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-gray-200">
      <div className="w-full max-w-md bg-zinc-900 p-6 rounded-2xl shadow-xl">

        {!token ? (
          <>
            {showRegister ? (
              <>
                <Register setToken={setToken} />

                <p className="text-sm text-center mt-4 text-gray-400">
                  Al een account?
                  <button
                    onClick={() => setShowRegister(false)}
                    className="ml-2 text-purple-400 hover:underline"
                  >
                    Inloggen
                  </button>
                </p>
              </>
            ) : (
              <>
                <Login setToken={setToken} />

                <p className="text-sm text-center mt-4 text-gray-400">
                  Nog geen account?
                  <button
                    onClick={() => setShowRegister(true)}
                    className="ml-2 text-purple-400 hover:underline"
                  >
                    Registreren
                  </button>
                </p>
              </>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-purple-400 text-center">
              Welkom bij FITD 👕
            </h2>

            <p className="text-center text-gray-400 mt-2">
              Je bent ingelogd
            </p>

            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-purple-700 hover:bg-purple-600 py-2 rounded-lg"
            >
              Uitloggen
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default App;
