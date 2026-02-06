import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Feed() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/items")
      .then((res) => res.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-gray-400">
        Loading feed…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 px-10 py-12">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-16">
          <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-4">
            Marketplace
          </p>

          <h1 className="font-serif text-5xl font-light">
            Latest listings
          </h1>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {items.map((item) => (
            <Link
              key={item._id}
              to={`/items/${item._id}`}
              className="group block"
            >
              {/* IMAGE */}
              {item.images?.length > 0 && (
                <div className="overflow-hidden rounded-3xl mb-4">
                  <img
                    src={`http://localhost:4000${item.images[0]}`}
                    alt={item.title}
                    className="h-96 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* TEXT */}
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-light leading-tight">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-1">
                  {item.description}
                </p>

                <div className="flex justify-between items-center pt-3 text-sm uppercase tracking-widest">
                  <span className="text-[#7A1E16]">
                    € {item.price}
                  </span>

                  {item.seller?.username && (
                    <span className="text-gray-500">
                      {item.seller.username}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
