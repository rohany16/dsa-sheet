import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard-container">

      <div className="welcome-card">

        <h1>
          Welcome, {user.name || "Student"} 👋
        </h1>

        <p>
          Welcome back! Continue your DSA journey
          and improve your problem-solving skills.
        </p>

      </div>

      <div className="dashboard-grid">

        <div
          className="dashboard-card"
          onClick={() => navigate("/topics")}
        >
          <h2>📚 Topics</h2>

          <p>
            Browse all DSA topics and solve
            problems chapter-wise.
          </p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/progress")}
        >
          <h2>📈 Progress</h2>

          <p>
            Track your overall, Easy, Medium,
            and Hard progress.
          </p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/profile")}
        >
          <h2>👤 Profile</h2>

          <p>
            View your profile information and
            account details.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;

