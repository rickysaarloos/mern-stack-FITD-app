import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Notifications from "./pages/Notifications";

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


function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const { token } = useContext(AuthContext);

  return (
    <CartProvider>
      <BrowserRouter>
      
        <FloatingCart />

        <Routes>
        
          <Route path="/" element={<Home />} />

          <Route path="/items" element={<Feed />} />

          <Route path="/items/:id" element={<ItemDetail />} />

       
          <Route path="/cart" element={<CartPage />} />

         
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />

       
          <Route
            path="/items/new"
            element={
              <PrivateRoute>
                <CreateItem />
              </PrivateRoute>
            }
          />

       
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
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

          
          <Route
            path="/purchases"
            element={
              <PrivateRoute>
                <Purchases />
              </PrivateRoute>
            }
          />

                 
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
