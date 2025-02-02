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
  
    // Fetch all assignments(GET)
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

      //Create a new Assignment(POST)
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


export default AssignmentsPage;