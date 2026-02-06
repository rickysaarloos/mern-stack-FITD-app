import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateItem from "./components/CreateItem";
import Profile from "./pages/Profile";
import Sales from "./pages/Sales";


import ItemList from "./components/ItemList";
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
        {/* 🛒 Drijvende winkelwagen */}
        <FloatingCart />

        <Routes>
          {/* 🏠 HOME */}
          <Route path="/" element={<Home />} />

          {/* 🛍️ FEED + DETAIL */}
          <Route path="/items" element={<ItemList />} />
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
<Route
  path="/sales"
  element={
    <PrivateRoute>
      <Sales />
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
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
