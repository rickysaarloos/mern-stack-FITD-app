import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateItem from "./components/CreateItem";

const PrivateRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/login" />;
};
import Profile from "./pages/Profile";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/"
          element={<Home token={token} setToken={setToken} />}
        />

        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <Register />}
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

        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
