import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css";

function Signup() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    // 🚨 Validation
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // 🔐 Teacher admin check
    if (role === "teacher" && adminPass !== "secret") {
      alert("Invalid Admin Password. Cannot register as teacher.");
      return;
    }

    // 🔥 Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 🚨 Check duplicate
    const exists = users.find((u) => u.email === email);

    if (exists) {
      alert("User already exists. Please login.");
      return;
    }

    // ✅ Save user
    const newUser = {
      email: email.trim(),
      password: password.trim(),
      role,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Now login.");

    navigate("/");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">SIGN UP</div>

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
            placeholder="Create password"
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

          <button className="auth-btn" onClick={handleSignup}>
            Create Account
          </button>
        </div>

        <div className="auth-footer">
          Already have an account? <Link to="/">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;