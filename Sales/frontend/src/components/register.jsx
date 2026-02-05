import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const { login } = useContext(AuthContext);

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registratie mislukt");
        return;
      }

      // 👉 centraal login via context
      login(data.token);

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <form
      className="bg-zinc-900 p-6 rounded-xl space-y-4"
      onSubmit={handleRegister}
    >
      <h2 className="text-2xl font-bold text-center text-orange-400">
        Registreren
      </h2>

      <input
        type="text"
        placeholder="Gebruikersnaam"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
      />

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
        placeholder="Wachtwoord (min. 6 tekens)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
      />

      <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 rounded">
        Registreren
      </button>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}
    </form>
  );
}

export default Register;
