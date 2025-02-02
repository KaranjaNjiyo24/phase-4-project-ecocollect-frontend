// src/components/AssignmentsPage.js
import React, { useState, useEffect } from "react";
import BASE_URL from "../config";

function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);

  // For creating a new assignment
  const [collectorId, setCollectorId] = useState("");
  const [pickupRequestId, setPickupRequestId] = useState("");
  const [status, setStatus] = useState("pending");
  const [scheduledDate, setScheduledDate] = useState("");

  // For editing an existing assignment
  const [editMode, setEditMode] = useState(false); // toggles the edit form
  const [assignmentToEdit, setAssignmentToEdit] = useState(null); // stores the assignment object being edited
  const [editStatus, setEditStatus] = useState("pending");
  const [editDate, setEditDate] = useState("");


  //  FETCH ALL ASSIGNMENTS (GET)
  useEffect(() => {
    fetchAssignments();
  }, []);

  function fetchAssignments() {
    fetch(`${BASE_URL}/assignments`)
      .then((r) => {
        if (!r.ok) throw new Error(`GET error: ${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((data) => {
        setAssignments(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }


  //  CREATE A NEW ASSIGNMENT (POST)

  function handleSubmit(e) {
    e.preventDefault();
    const newAssignment = {
      collector_id: collectorId,
      pickup_request_id: pickupRequestId,
      status: status,
      scheduled_date: scheduledDate,
    };

    fetch(`${BASE_URL}/assignments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAssignment),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`POST error: ${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((created) => {
        // Append newly created assignment to list
        setAssignments([...assignments, created]);

        // Reset the create form
        setCollectorId("");
        setPickupRequestId("");
        setStatus("pending");
        setScheduledDate("");
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  //  ENTER EDIT MODE

  function handleEditClick(a) {
    setError(null);
    setEditMode(true);
    setAssignmentToEdit(a);
    setEditStatus(a.status);
    setEditDate(a.scheduled_date || ""); 
  }


  //  UPDATE AN EXISTING ASSIGNMENT (PUT)

  function handleUpdate(e) {
    e.preventDefault();
    if (!assignmentToEdit) return;

    const updatedData = {
      status: editStatus,
      scheduled_date: editDate,
    };

    fetch(`${BASE_URL}/assignments/${assignmentToEdit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`PUT error: ${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((updatedAssignment) => {
        // Update assignment in local state
        const updatedList = assignments.map((a) =>
          a.id === updatedAssignment.id ? updatedAssignment : a
        );
        setAssignments(updatedList);

        // Exit edit mode
        setEditMode(false);
        setAssignmentToEdit(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }


  // DELETE AN ASSIGNMENT (DELETE)

  function handleDeleteClick(id) {
    setError(null);

    fetch(`${BASE_URL}/assignments/${id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.status === 404) {
          throw new Error(`Assignment with ID ${id} not found`);
        } else if (!r.ok) {
          throw new Error(`DELETE error: ${r.status} ${r.statusText}`);
        }
        // If successful (204), remove from local state
        const filtered = assignments.filter((a) => a.id !== id);
        setAssignments(filtered);
      })
      .catch((err) => {
        setError(err.message);
      });
  }


  // RENDER

  return (
    <div className="card">
      <h2>Assignments</h2>
      {error && <p className="form-error">{error}</p>}

      {/* LIST ALL ASSIGNMENTS*/}
      {assignments.length > 0 ? (
        <ul className="eco-list">
          {assignments.map((a) => (
            <li key={a.id}>
              <strong>ID:</strong> {a.id} |{" "}
              <strong>Status:</strong> {a.status} |{" "}
              <strong>Scheduled:</strong> {a.scheduled_date || "N/A"} |{" "}
              <strong>Collector:</strong> {a.collector_id} |{" "}
              <strong>Pickup Request:</strong> {a.pickup_request_id}
              {"  "}
              {/* Edit & Delete buttons */}
              <button style={{ marginLeft: "auto" }} onClick={() => handleEditClick(a)}>
                Edit
              </button>
              <button
                style={{ marginLeft: "0.5rem", backgroundColor: "#d32f2f" }}
                onClick={() => handleDeleteClick(a.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No assignments found.</p>
      )}

      <hr />

          {/* CREATE A NEW ASSIGNMENT FORM */}

      <h3>Create New Assignment</h3>
      <form onSubmit={handleSubmit}>
        <label>Collector ID</label>
        <input
          type="number"
          value={collectorId}
          onChange={(e) => setCollectorId(e.target.value)}
          required
        />

        <label>Pickup Request ID</label>
        <input
          type="number"
          value={pickupRequestId}
          onChange={(e) => setPickupRequestId(e.target.value)}
          required
        />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">pending</option>
          <option value="in-progress">in-progress</option>
          <option value="completed">completed</option>
        </select>

        <label>Scheduled Date (YYYY-MM-DD)</label>
        <input
          type="text"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
        />

        <button type="submit">Create Assignment</button>
      </form>

          {/* EDIT AN EXISTING ASSIGNMENT FORM */}

      {editMode && assignmentToEdit && (
        <>
          <hr />
          <h3>Edit Assignment (ID: {assignmentToEdit.id})</h3>
          <form onSubmit={handleUpdate}>
            <label>Status</label>
            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
              <option value="pending">pending</option>
              <option value="in-progress">in-progress</option>
              <option value="completed">completed</option>
            </select>

            <label>Scheduled Date (YYYY-MM-DD)</label>
            <input
              type="text"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />

            <button type="submit">Update Assignment</button>
            <button
              type="button"
              style={{ marginLeft: "1rem", backgroundColor: "#ccc" }}
              onClick={() => {
                setEditMode(false);
                setAssignmentToEdit(null);
              }}
            >
              Cancel
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default AssignmentsPage;
