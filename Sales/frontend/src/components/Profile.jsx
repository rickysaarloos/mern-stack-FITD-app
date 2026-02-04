import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  // Optioneel: haal info van de ingelogde gebruiker (bijv. van token of API)
  useEffect(() => {
    // Voorbeeld: uit localStorage halen
    const token = localStorage.getItem("token");

    if (token) {
      // Hier kun je eventueel een API-call doen om user-data te halen
      // Voor nu dummy data
      setUser({
        username: "JohnDoe",
        email: "johndoe@example.com",
      });
    }
  }, []);

  if (!user) {
    return <p>Laadt profiel...</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Profielpagina</h2>
      <p><strong>Gebruikersnaam:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Profile;
