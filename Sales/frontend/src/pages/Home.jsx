function Home({ token, setToken }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-gray-200">
      <div className="w-full max-w-md bg-zinc-900 p-6 rounded-2xl shadow-xl text-center">

        <h1 className="text-2xl font-bold text-purple-400">
          FITD 👕
        </h1>

        <p className="text-gray-400 mt-2">
          Koop & verkoop kleding
        </p>

        {!token ? (
          <>
            <p className="mt-4 text-gray-400">
              Log in om kleding te verkopen
            </p>

            <div className="mt-4 flex gap-3 justify-center">
              <a
                href="/login"
                className="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-600"
              >
                Inloggen
              </a>


              <a
  href="/profile"
  className="mt-4 inline-block text-purple-400 hover:underline"
>
  Naar mijn profiel
</a>


              <a
                href="/register"
                className="border border-purple-500 px-4 py-2 rounded-lg hover:bg-purple-900"
              >
                Registreren
              </a>
            </div>
          </>
        ) : (
          <>
            <p className="mt-4 text-green-400">
              Je bent ingelogd ✅
            </p>

            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-purple-700 hover:bg-purple-600 py-2 rounded-lg"
            >
              Uitloggen
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Home;
