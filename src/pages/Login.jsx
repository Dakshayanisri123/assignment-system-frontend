import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password &&
        u.role === role
    );

    if (!user) {
      setError("Invalid credentials or account not found. Please sign up first.");
      return;
    }

    if (role === "teacher" && adminPass !== "secret") {
      setError("Invalid Admin Password.");
      return;
    }

    // ✅ Save current user
    localStorage.setItem("user", JSON.stringify(user));

    if (role === "student") {
      navigate("/student");
    } else {
      navigate("/teacher");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">LOG IN</div>

        <div className="role-switch">
          <button
            className={role === "student" ? "active" : ""}
            onClick={() => setRole("student")}
          >
            Student
          </button>
          <button
            className={role === "teacher" ? "active" : ""}
            onClick={() => setRole("teacher")}
          >
            Teacher
          </button>
        </div>

        <div className="auth-body">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {role === "teacher" && (
            <>
              <label>Admin Password</label>
              <input
                type="password"
                placeholder="Enter admin password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
              />
            </>
          )}

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button className="auth-btn" onClick={handleLogin}>
            Log in
          </button>
        </div>

        <div className="auth-footer">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;