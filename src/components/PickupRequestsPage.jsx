// src/components/PickupRequestsPage.js
import React, { useState, useEffect } from "react";
import BASE_URL from "../config";

function PickupRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/pickup_requests`)
      .then((r) => {
        if (!r.ok) throw new Error(`Fetch error: ${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((data) => setRequests(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="card">
      <h2>Pickup Requests</h2>
      {error && <p className="form-error">{error}</p>}

      {requests.length > 0 ? (
        <ul className="eco-list">
          {requests.map((pr) => (
            <li key={pr.id}>
              <strong>ID:</strong> {pr.id} |{" "}
              <strong>Description:</strong> {pr.description} |{" "}
              <strong>Location:</strong> {pr.location}
            </li>
          ))}
        </ul>
      ) : (
        <p>No pickup requests found.</p>
      )}
    </div>
  );
}

export default PickupRequestsPage;
