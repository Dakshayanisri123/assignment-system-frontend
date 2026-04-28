import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadAssignment from "./UploadAssignment";
import "../dashboard.css";

function TeacherDashboard() {
  const navigate = useNavigate();

  const [page, setPage] = useState("dashboard");
  const [submissions, setSubmissions] = useState([]);

  // 🔥 FETCH DATA
  const fetchSubmissions = () => {
    fetch("https://assignment-system-backend.onrender.com/api/submissions")
      .then(res => res.json())
      .then(data => setSubmissions(data));
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // 🔥 SAVE MARKS (FIXED HERE ✅)
  const handleSave = async (id) => {
    const marks = document.getElementById(`marks-${id}`).value;
    const feedback = document.getElementById(`feedback-${id}`).value;

    await fetch(`https://assignment-system-backend.onrender.com/api/submissions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ marks, feedback }),
    });

    alert("Graded!");
    fetchSubmissions();
  };

  return (
    <div className="dashboard-container">
      
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>👩‍🏫 Teacher</h2>

        <p onClick={() => setPage("dashboard")}>Dashboard</p>
        <p onClick={() => setPage("upload")}>Upload Assignments</p>
        <p onClick={() => setPage("submissions")}>Submissions</p>

        <button onClick={() => navigate("/")}>Logout</button>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <>
            <h2>Teacher Dashboard</h2>
            <p>Total Submissions: {submissions.length}</p>
          </>
        )}

        {/* UPLOAD PAGE */}
        {page === "upload" && <UploadAssignment />}

        {/* SUBMISSIONS */}
        {page === "submissions" && (
          <>
            <h2>Submissions</h2>

            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Assignment</th>
                  <th>File</th>
                  <th>Marks</th>
                  <th>Feedback</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id}>
                    <td>{s.studentName}</td>
                    <td>{s.assignmentTitle}</td>

                    {/* 🔥 FILE VIEW (FIXED HERE ✅) */}
                    <td>
                      {s.fileName ? (
                        <a
                          href={`https://assignment-system-backend.onrender.com/api/submissions/file/${s.fileName}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View PDF
                        </a>
                      ) : (
                        "No File"
                      )}
                    </td>

                    <td>
                      <input
                        id={`marks-${s.id}`}
                        defaultValue={s.marks || ""}
                      />
                    </td>

                    <td>
                      <input
                        id={`feedback-${s.id}`}
                        defaultValue={s.feedback || ""}
                      />
                    </td>

                    <td>
                      <button onClick={() => handleSave(s.id)}>
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;