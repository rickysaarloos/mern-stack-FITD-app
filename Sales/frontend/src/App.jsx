import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateItem from "./components/CreateItem";

const PrivateRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home token={token} setToken={setToken} />}
        />

        <Route
          path="/login"
          element={
            token ? <Navigate to="/" /> : <Login setToken={setToken} />
          }
        />

        <Route
          path="/register"
          element={
            token ? <Navigate to="/" /> : <Register setToken={setToken} />
          }
        />

        {/* 🔐 ALLEEN INGELOGD */}
        <Route
          path="/items/new"
          element={
            <PrivateRoute token={token}>
              <CreateItem />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
