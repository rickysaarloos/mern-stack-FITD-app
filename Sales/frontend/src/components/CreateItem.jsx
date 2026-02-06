import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="min-h-screen bg-zinc-950 text-gray-100 px-10 py-12">
      <div className="max-w-3xl mx-auto">

        {/* NAV */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm uppercase tracking-widest text-gray-400 hover:text-white mb-12"
        >
          ← Back
        </button>

        {/* HEADER */}
        <div className="mb-14">
          <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-4">
            New listing
          </p>

          <h1 className="font-serif text-5xl font-light">
            List an item
          </h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-8">

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-900 p-4 rounded-xl outline-none focus:ring-1 focus:ring-[#7A1E16]"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Price (€)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-zinc-900 p-4 rounded-xl outline-none focus:ring-1 focus:ring-[#7A1E16]"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Brand
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full bg-zinc-900 p-4 rounded-xl outline-none"
            >
              <option value="">Select brand</option>
              <option>Nike</option>
              <option>Adidas</option>
              <option>Puma</option>
              <option>H&M</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-900 p-4 rounded-xl outline-none focus:ring-1 focus:ring-[#7A1E16]"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages([...e.target.files])}
              className="text-sm text-gray-400"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm uppercase tracking-widest">
              {error}
            </p>
          )}

          <button
            className="
              bg-[#7A1E16]
              hover:bg-[#8B1D18]
              transition
              px-10
              py-4
              rounded-full
              text-sm
              uppercase
              tracking-widest
            "
          >
            Publish listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateItem;
