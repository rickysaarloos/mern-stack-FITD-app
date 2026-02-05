import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateItem from "./components/CreateItem";
import Profile from "./pages/Profile";

import { CartProvider } from "./context/CartContext";
import FloatingCart from "./components/FloatingCart";
import CartPage from "./components/CartPage";
import ItemList from "./components/ItemList"; // Vervangt ProductList

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
        {/* Drijvende winkelwagen */}
        <FloatingCart />

        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* ITEMS + CART */}
          <Route path="/items" element={<ItemList />} />
          <Route path="/cart" element={<CartPage />} />

          {/* AUTH */}
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />

          {/* 🔐 ITEM CREËREN */}
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
    </CartProvider>
  );
}

export default App;
