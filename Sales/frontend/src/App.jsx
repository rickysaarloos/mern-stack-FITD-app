import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateItem from "./components/CreateItem";
import Profile from "./pages/Profile";
import Sales from "./pages/Sales";
import Purchases from "./pages/Purchases";

import Feed from "./pages/Feed";

import ItemDetail from "./pages/ItemDetail";

import { CartProvider } from "./context/CartContext";
import FloatingCart from "./components/FloatingCart";
import CartPage from "./components/CartPage";

// 🔐 Private route wrapper
function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const { token } = useContext(AuthContext);

  return (
    <CartProvider>
      <BrowserRouter>
        {/* 🛒 Floating cart */}
        <FloatingCart />

        <Routes>
          {/* 🏠 HOME */}
          <Route path="/" element={<Home />} />

          {/* 🛍️ FEED */}
          <Route path="/items" element={<Feed />} />

          <Route path="/items/:id" element={<ItemDetail />} />

          {/* 🛒 CART */}
          <Route path="/cart" element={<CartPage />} />

          {/* 🔐 AUTH */}
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />

          {/* ➕ ITEM AANMAKEN */}
          <Route
            path="/items/new"
            element={
              <PrivateRoute>
                <CreateItem />
              </PrivateRoute>
            }
          />

          {/* 👤 PROFIEL */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* 📊 VERKOPEN */}
          <Route
            path="/sales"
            element={
              <PrivateRoute>
                <Sales />
              </PrivateRoute>
            }
          />

          {/* 🧾 AANKOPEN */}
          <Route
            path="/purchases"
            element={
              <PrivateRoute>
                <Purchases />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
