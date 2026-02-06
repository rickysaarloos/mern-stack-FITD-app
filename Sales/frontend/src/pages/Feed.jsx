import { Link } from "react-router-dom";
import ItemList from "../components/ItemList";

function Feed() {
  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 px-10 py-12">
      <div className="max-w-7xl mx-auto">

        {/* NAV */}
        <div className="flex justify-between items-center mb-16">
          <div>
            <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-4">
              Marketplace
            </p>
            <h1 className="font-serif text-5xl font-light">
              Latest listings
            </h1>
          </div>

          <div className="flex gap-4">
            <Link
              to="/"
              className="text-sm uppercase tracking-widest text-gray-400 hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/profile"
              className="text-sm uppercase tracking-widest text-gray-400 hover:text-white"
            >
              Profile
            </Link>
          </div>
        </div>

        {/* ITEMS */}
        <ItemList />

      </div>
    </div>
  );
}

export default Feed;
