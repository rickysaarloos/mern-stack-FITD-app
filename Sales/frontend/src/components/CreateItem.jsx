import { useState } from "react";
import { Link } from "react-router-dom";

function CreateItem() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price) {
      setError("Titel en prijs zijn verplicht");
      return;
    }

    console.log({ title, price, description });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-gray-200">
      <div className="w-full max-w-lg bg-zinc-900 p-6 rounded-2xl shadow-xl">

       
        <Link
          to="/"
          className="text-sm text-purple-400 hover:underline"
        >
          ← Terug naar home
        </Link>

        <h1 className="text-2xl font-bold text-purple-400 mt-4">
          Item plaatsen 👕
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">

          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
          />

          <input
            type="number"
            placeholder="Prijs (€)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
          />

          <textarea
            placeholder="Beschrijving"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
          />

          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-600 py-2 rounded-lg font-semibold"
          >
            Plaats item
          </button>

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateItem;
