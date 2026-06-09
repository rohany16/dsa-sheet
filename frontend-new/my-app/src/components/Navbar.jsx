import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">DSA Sheet</Link>
      </div>

      <div className="navbar-links">
        {/* <Link to="/">Dashboard</Link> */}

        <Link to="/topics">Topics</Link>

        <Link to="/progress">Progress</Link>

        <Link to="/profile">Profile</Link>

        {!token ? (
          <Link to="/login">Login</Link>
        ) : (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

