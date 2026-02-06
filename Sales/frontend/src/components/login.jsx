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
    } catch {
      setError("Server niet bereikbaar");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 space-y-6 shadow-lg"
      >
        <h2 className="font-serif text-3xl text-center text-gray-100">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A1E16]"
        />

        <input
          type="password"
          placeholder="Wachtwoord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A1E16]"
        />

        <button
          type="submit"
          className="w-full bg-[#7A1E16] hover:bg-[#8B1D18] transition text-white uppercase tracking-widest py-3 rounded-full"
        >
          Inloggen
        </button>

        <p className="text-center text-sm text-gray-400">
          Nog geen account?{" "}
          <Link
            to="/register"
            className="text-[#7A1E16] hover:underline"
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
    </div>
  );
}

export default Login;
