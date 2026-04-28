import { useState } from "react";

function UploadAssignment() {
  const [course, setCourse] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  // ✅ COURSE LIST
  const courses = [
    "Web Development",
    "Database Systems",
    "Java Programming",
    "Machine Learning",
    "Computer Networks",
    "Operating Systems",
    "Software Engineering",
    "Data Structures",
    "Python Programming",
    "Cloud Computing",
    "Cyber Security",
    "AI Fundamentals"
  ];

  const handleUpload = async () => {
    if (!course || !title || !deadline) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "https://assignment-system-backend.onrender.com/api/assignments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, course, deadline }),
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      alert("Assignment created successfully!");

      // reset form
      setCourse("");
      setTitle("");
      setDeadline("");

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <h2>Upload Assignment</h2>

      {/* ✅ COURSE DROPDOWN */}
      <p>Select Course:</p>
      <select value={course} onChange={(e) => setCourse(e.target.value)}>
        <option value="">-- Select Course --</option>
        {courses.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* ✅ TITLE */}
      <p>Assignment Title:</p>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      />

      {/* ✅ DEADLINE */}
      <p>Deadline:</p>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <br /><br />

      {/* ✅ BUTTON */}
      <button onClick={handleUpload}>
        Upload Assignment
      </button>
    </div>
  );
}

export default UploadAssignment;