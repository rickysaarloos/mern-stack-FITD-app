import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Inloggen mislukt");
        return;
      }

      login(data.token);
    } catch (err) {
      setError("Server niet bereikbaar");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-zinc-900 p-6 rounded-xl space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-center text-purple-400">
        Inloggen
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
      />

      <input
        type="password"
        placeholder="Wachtwoord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
      />

      <button
        type="submit"
        className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 rounded"
      >
        Inloggen
      </button>

      {/* 👉 link naar registreren */}
      <p className="text-center text-sm text-gray-400">
        Nog geen account?{" "}
        <Link
          to="/register"
          className="text-purple-400 hover:underline"
        >
          Registreren
        </Link>
      </p>

      {error && (
        <p className="text-red-400 text-sm text-center">
          {error}
        </p>
      )}
    </form>
  );
}

export default Login;
