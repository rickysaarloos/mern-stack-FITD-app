import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { logout } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Welkom, je bent ingelogd</h1>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
