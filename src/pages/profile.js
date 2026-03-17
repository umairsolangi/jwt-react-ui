import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); 
      return;
    }

    API.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      localStorage.removeItem("token");
      navigate("/login");
    });

  }, [navigate]);

  return (
    <div className="container">
      <div className="profile-box">
        <h2 className="title">Profile</h2>

        {user ? (
          <>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;