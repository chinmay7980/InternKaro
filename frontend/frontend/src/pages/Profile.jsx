import { useEffect, useState } from "react";
import API from "../api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/me");
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!user)
    return (
      <div className="auth-container">
        <h2>Loading profile...</h2>
      </div>
    );

  return (
    <div className="auth-container">
      <h2>👋 Welcome, {user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
