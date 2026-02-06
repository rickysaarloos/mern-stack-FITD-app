import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/api/items/${id}`)
      .then((res) => res.json())
      .then(setItem)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-gray-400">
        Item laden…
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-gray-400">
        Item niet gevonden
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 px-10 py-12">
      <div className="max-w-7xl mx-auto">

        {/* NAV */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm uppercase tracking-widest text-gray-400 hover:text-white mb-12"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* IMAGES */}
          <div className="space-y-6">
            {item.images?.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:4000${img}`}
                alt={item.title}
                className="rounded-3xl object-cover w-full"
              />
            ))}
          </div>

          {/* INFO */}
          <div className="flex flex-col">

            <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-4">
              Listing
            </p>

            <h1 className="font-serif text-5xl font-light mb-6">
              {item.title}
            </h1>

            <p className="text-[#7A1E16] text-3xl font-light mb-8">
              € {item.price}
            </p>

            <p className="text-gray-400 leading-relaxed max-w-md mb-10">
              {item.description}
            </p>

            <p className="text-sm uppercase tracking-widest text-gray-500 mb-12">
              Seller —{" "}
              <span className="text-gray-300">
                {item.seller?.username}
              </span>
            </p>

            {token ? (
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
                  w-fit
                "
              >
                Buy item
              </button>
            ) : (
              <p className="text-gray-500 text-sm uppercase tracking-widest">
                Log in om te kopen
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
