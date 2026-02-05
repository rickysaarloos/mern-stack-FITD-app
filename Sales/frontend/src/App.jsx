import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateItem from "./components/CreateItem";
import Profile from "./pages/Profile";

// 🔐 Private route wrapper
function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <Register />}
        />

        {/* 🔐 ITEM PLAATSEN */}
        <Route
          path="/items/new"
          element={
            <PrivateRoute>
              <CreateItem />
            </PrivateRoute>
          }
        />

        {/* 🔐 PROFIEL */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
