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
}
  
  export default UserForm;