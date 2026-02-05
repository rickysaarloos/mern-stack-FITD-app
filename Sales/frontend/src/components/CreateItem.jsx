import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function CreateItem() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");

  const [images, setImages] = useState([]);
  const [imageInput, setImageInput] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !price || !description) {
      setError("Titel, prijs en beschrijving zijn verplicht");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔐 JWT
        },
        body: JSON.stringify({
          title,
          price,
          description,
          brand,
          images,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Item plaatsen mislukt");
        return;
      }

      // ✅ succes → naar profiel
      navigate("/profile");

    } catch (err) {
      setError("Server niet bereikbaar");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-gray-200">
      <div className="w-full max-w-lg bg-zinc-900 p-6 rounded-2xl shadow-xl">

        <Link to="/" className="text-sm text-purple-400 hover:underline">
          ← Terug naar home
        </Link>

        <h1 className="text-2xl font-bold text-purple-400 mt-4">
          Item plaatsen 👕
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">

          {/* Titel */}
          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
          />

          {/* Prijs */}
          <input
            type="number"
            placeholder="Prijs (€)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
          />

          {/* Merk */}
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
          >
            <option value="">Selecteer merk</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Zara">Zara</option>
            <option value="H&M">H&M</option>
            <option value="Overig">Overig</option>
          </select>

          {/* Image URL input */}
          <input
            type="text"
            placeholder="Afbeelding URL (druk op Enter)"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (!imageInput) return;
                setImages([...images, imageInput]);
                setImageInput("");
              }
            }}
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
          />

          {/* Image previews */}
          {images.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                />
              ))}
            </div>
          )}

          {/* Beschrijving */}
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
