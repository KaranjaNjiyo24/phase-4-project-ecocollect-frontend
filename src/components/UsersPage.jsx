import React, { useEffect, useState } from "react";
import BASE_URL from "../config";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch(`${BASE_URL}/users`)
        .then((r) => {
          if (!r.ok) throw new Error(`Error: ${r.status} ${r.statusText}`);
          return r.json();
        })
        .then((data) => setUsers(data))
        .catch((err) => setError(err.message));
    }, []);
  
    return (
      <div className="card">
        <h2>Users</h2>
        {error && <p className="form-error">{error}</p>}
  
        {users.length > 0 ? (
          <ul className="eco-list">
            {users.map((user) => (
              <li key={user.id}>
                <strong>{user.username}</strong> ({user.role})
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    );
}

export default UsersPage;