import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function CreateItem() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("brand", brand);

    images.forEach((img) => {
      formData.append("images", img);
    });

    const res = await fetch("http://localhost:4000/api/items", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      setError("Item upload mislukt");
      return;
    }

    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-xl space-y-4 w-full max-w-lg"
      >
        <Link to="/" className="text-purple-400">← Home</Link>

        <input
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-zinc-800 text-white"
        />

        <input
          type="number"
          placeholder="Prijs"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 bg-zinc-800 text-white"
        />

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full p-2 bg-zinc-800 text-white"
        >
          <option value="">Selecteer merk</option>
          <option>Nike</option>
          <option>Adidas</option>
          <option>Puma</option>
          <option>H&M</option>
        </select>

        <textarea
          placeholder="Beschrijving"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-zinc-800 text-white"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages([...e.target.files])}
          className="text-white"
        />

        <button className="w-full bg-purple-700 py-2 rounded text-white">
          Plaats item
        </button>

        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
}

export default CreateItem;
