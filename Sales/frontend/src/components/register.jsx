import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Wachtwoord moet minimaal 6 tekens zijn");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registratie mislukt");
        return;
      }

      login(data.token);
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 space-y-6 shadow-lg"
      >
        {/* TERUG */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm uppercase tracking-widest text-gray-400 hover:text-white"
        >
          ← Terug
        </button>

        <h2 className="font-serif text-3xl text-center text-gray-100">
          Registreren
        </h2>

        <input
          type="text"
          placeholder="Gebruikersnaam"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A1E16]"
        />

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
          placeholder="Wachtwoord (min. 6 tekens)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A1E16]"
        />

        <button className="w-full bg-[#7A1E16] hover:bg-[#8B1D18] transition text-white uppercase tracking-widest py-3 rounded-full">
          Registreren
        </button>

        <p className="text-center text-sm text-gray-400">
          Heb je al een account?{" "}
          <Link
            to="/login"
            className="text-[#7A1E16] hover:underline"
          >
            Inloggen
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

export default Register;
