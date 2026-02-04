import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  return (
    <BrowserRouter>
      <Routes>

        {/* HOME – publiek toegankelijk */}
        <Route
          path="/"
          element={<Home token={token} setToken={setToken} />}
        />

        {/* LOGIN – alleen als je NIET bent ingelogd */}
        <Route
          path="/login"
          element={
            token ? <Navigate to="/" /> : <Login setToken={setToken} />
          }
        />

        {/* REGISTER – alleen als je NIET bent ingelogd */}
        <Route
          path="/register"
          element={
            token ? <Navigate to="/" /> : <Register setToken={setToken} />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
