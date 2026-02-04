import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div>
      {token ? (
        <>
          <h1>Welkom, je bent ingelogd!</h1>
          <button onClick={logout}>Logout</button>
          <button onClick={() => navigate("/profile")}>Ga naar profiel</button>
        </>
      ) : (
        <>
          <h1>Welkom!</h1>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Registreren</button>
        </>
      )}
    </div>
  );
};

export default Home;
