import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";  // <-- NEW IMPORT
import BASE_URL from "../config";

function UserForm() {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // React Router hook for navigating
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Must be 3 chars or more"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Must be 6 chars or more"),
    role: Yup.string()
      .oneOf(["resident", "collector"], "Invalid role")
      .required("Role is required"),
  });  

// Initialize Formik
const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "resident",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setServerError("");
      setSuccessMessage("");

      fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((r) => {
          if (!r.ok) {
            throw new Error(`HTTP status ${r.status}`);
          }
          return r.json();
        })
        .then(() => {
          // Set a success message
          setSuccessMessage("User created successfully!");
          // Reset form fields
          resetForm();
          // After creation, navigate to /users
          navigate("/users");
        })
        .catch((err) => setServerError(err.message));
    },
  });
  return (
    <div className="card">
      <h2>Create New User</h2>

      {/* Display server success/error */}
      {serverError && <p className="form-error">{serverError}</p>}
      {successMessage && <p className="form-success">{successMessage}</p>}

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username && (
          <div className="form-error">{formik.errors.username}</div>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="form-error">{formik.errors.password}</div>
        )}

        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="resident">resident</option>
          <option value="collector">collector</option>
        </select>
        {formik.touched.role && formik.errors.role && (
          <div className="form-error">{formik.errors.role}</div>
        )}

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
  
  export default UserForm;