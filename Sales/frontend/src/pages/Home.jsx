import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { token, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 flex flex-col">

      {/* NAVBAR */}
      <header className="flex justify-between items-center px-10 py-6">
        <h1 className="font-serif text-xl tracking-wide">
          FITD
        </h1>

        <nav className="flex gap-6 text-sm uppercase tracking-widest text-gray-400">
          <Link to="/items" className="hover:text-white transition">
            Feed
          </Link>

          {token && (
            <Link to="/profile" className="hover:text-white transition">
              Profile
            </Link>
          )}

          {!token ? (
            <Link to="/login" className="hover:text-white transition">
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="hover:text-white transition"
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      {/* HERO */}
      <main className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <div>
            <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-6">
              Curated fashion marketplace
            </p>

            <h2 className="font-serif text-5xl md:text-7xl font-light leading-tight mb-8">
              Buy & sell <br />
              fashion with <br />
              character
            </h2>

            <p className="text-gray-400 max-w-md mb-10 leading-relaxed">
              Discover unique pieces from independent sellers.  
              Timeless fashion, carefully selected.
            </p>
<div className="flex gap-6 flex-wrap">
  <Link
    to="/items"
    className="
      bg-[#7A1E16]
      hover:bg-[#8B1D18]
      transition
      px-8
      py-4
      rounded-full
      text-sm
      uppercase
      tracking-widest
    "
  >
    Explore feed
  </Link>

  {token && (
    <Link
      to="/items/new"
      className="
        border
        border-[#7A1E16]
        text-[#7A1E16]
        hover:bg-[#7A1E16]
        hover:text-white
        transition
        px-8
        py-4
        rounded-full
        text-sm
        uppercase
        tracking-widest
      "
    >
      List item
    </Link>
  )}

  {!token && (
    <Link
      to="/register"
      className="
        border
        border-gray-600
        hover:border-white
        transition
        px-8
        py-4
        rounded-full
        text-sm
        uppercase
        tracking-widest
      "
    >
      Join
    </Link>
  )}
</div>

          </div>

          {/* VISUAL BLOCK */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-[#7A1E16] opacity-20 rounded-3xl" />
              <img
                src=""
                alt="Fashion"
                className="relative rounded-3xl object-cover h-[520px] w-full"
              />
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="px-10 py-6 text-xs text-gray-500 uppercase tracking-widest">
        © {new Date().getFullYear()} FITD — Fashion in the details
      </footer>
    </div>
  );
}

export default Home;
