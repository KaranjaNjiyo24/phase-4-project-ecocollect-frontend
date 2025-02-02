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
  


export default AssignmentsPage;