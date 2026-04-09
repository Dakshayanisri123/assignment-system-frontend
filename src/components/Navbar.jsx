import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div>📘 Assignment System</div>
      <div>
        <Link to="/">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/student">Student</Link>
        <Link to="/teacher">Faculty</Link>
      </div>
    </div>
  );
}

export default Navbar;