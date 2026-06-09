import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return (
      <div className="profile-loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="profile-container">

      <div className="profile-card">

        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h1>My Profile</h1>

        <div className="profile-info">

          <div className="profile-row">

            <span className="label">
              Name
            </span>

            <span className="value">
              {user.name}
            </span>

          </div>

          <div className="profile-row">

            <span className="label">
              Email
            </span>

            <span className="value">
              {user.email}
            </span>

          </div>

          <div className="profile-row">

            <span className="label">
              Role
            </span>

            <span className="value">
              {user.role}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;