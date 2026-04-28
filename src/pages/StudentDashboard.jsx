import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../dashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  const [page, setPage] = useState("dashboard");
  const [submissions, setSubmissions] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= FETCH =================
  const fetchSubmissions = () => {
    fetch(`https://assignment-system-backend.onrender.com/api/submissions/student/${user.email}`)
      .then(res => res.json())
      .then(data => setSubmissions(data));
  };

  const fetchAssignments = () => {
    fetch("https://assignment-system-backend.onrender.com/api/assignments")
      .then(res => res.json())
      .then(data => setAssignments(data));
  };

  useEffect(() => {
    fetchSubmissions();
    fetchAssignments();
  }, []);

  // ================= UPLOAD =================
  const handleFileChange = async (index, file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("studentName", user.email);
    formData.append("assignmentTitle", assignments[index].title);
    formData.append("course", assignments[index].course);

    const res = await fetch("https://assignment-system-backend.onrender.com/api/submissions/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Upload failed!");
      return;
    }

    alert("Submitted!");
    fetchSubmissions();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // ================= DASHBOARD =================
  const renderDashboard = () => (
    <>
      <h2>Dashboard</h2>
      <div className="cards">
        <div className="card-box">
          <h3>Total Assignments</h3>
          <p>{assignments.length}</p>
        </div>
        <div className="card-box">
          <h3>Submitted</h3>
          <p>{submissions.length}</p>
        </div>
        <div className="card-box">
          <h3>Graded</h3>
          <p>{submissions.filter(s => s.status === "graded").length}</p>
        </div>
      </div>
    </>
  );

  // ================= ASSIGNMENTS =================
  const renderAssignments = () => (
    <>
      <h2>Assignments</h2>

      {assignments.map((a, i) => {
        const sub = submissions.find(
          s => s.assignmentTitle.toLowerCase() === a.title.toLowerCase()
        );

        return (
          <div key={i} className="card-box">
            <h3>{a.title}</h3>
            <p>Course: {a.course}</p>
            <p>Deadline: {a.deadline}</p>

            <p>
              Status:
              <span className={`status ${sub?.status || "pending"}`}>
                {(sub?.status || "pending").toUpperCase()}
              </span>
            </p>

            {sub?.fileName && (
              <>
                <p>📎 {sub.fileName}</p>
                <a
                  href={`https://assignment-system-backend.onrender.com/api/submissions/file/${sub.fileName}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View PDF
                </a>
              </>
            )}

            {!sub && (
              <input
                type="file"
                onChange={(e) => handleFileChange(i, e.target.files[0])}
              />
            )}
          </div>
        );
      })}
    </>
  );

  // ================= TASKS =================
  const renderTasks = () => (
    <>
      <h2>Tasks</h2>

      {assignments.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        assignments.map((a, i) => (
          <div key={i} className="card-box">
            <h3>{a.title}</h3>
            <p>Course: {a.course}</p>
            <p>Deadline: {a.deadline}</p>
          </div>
        ))
      )}
    </>
  );

  // ================= GRADES =================
  const renderGrades = () => (
    <>
      <h2>Grades</h2>

      {submissions.length === 0 ? (
        <p>No grades yet</p>
      ) : (
        submissions.map((s, i) => (
          <div key={i} className="card-box">
            <h3>{s.assignmentTitle}</h3>
            <p>Status: {s.status}</p>

            {s.status === "graded" && (
              <>
                <p>Marks: {s.marks}</p>
                <p>Feedback: {s.feedback}</p>
              </>
            )}
          </div>
        ))
      )}
    </>
  );

  // ================= UI =================
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>🎓 Student</h2>

        <p onClick={() => setPage("dashboard")}>Dashboard</p>
        <p onClick={() => setPage("assignments")}>Assignments</p>
        <p onClick={() => setPage("tasks")}>Tasks</p>
        <p onClick={() => setPage("grades")}>Grades</p>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="main">
        {page === "dashboard" && renderDashboard()}
        {page === "assignments" && renderAssignments()}
        {page === "tasks" && renderTasks()}
        {page === "grades" && renderGrades()}
      </div>
    </div>
  );
}

export default StudentDashboard;