import React, { useState } from "react";
import loginImg from "../../assets/images/login3-remove.png";
import logo from "../../assets/images/key.png";
import "./login.css";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setApiError("");
    setSuccessMessage("");

    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      console.log("Submitting login request...");
      const response = await axios.post("http://localhost/api/login", {
        email,
        password,
      });

      const accessToken = response.data.data.idToken;

      console.log("Login successful, token:", accessToken);
      localStorage.setItem("token", accessToken);

      setSuccessMessage("Login successful!");

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Error:", error);
      if (error.response) {
        setApiError(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else if (error.request) {
        setApiError("No response from server. Please check your connection.");
      } else {
        setApiError("An unexpected error occurred.");
      }
    }
  }

  return (
    <div className="login-main-container w-75">
      <div className="row card-login ">
        {/* Form column container */}
        <div className="col-md-6 col-12 d-flex justify-content-center align-items-center flex-column bg-light">
          <form className="p-5" onSubmit={handleSubmit}>
            <img
              src={logo}
              className="text-center m-auto d-block logo-img"
              alt="logo Image"
            />
            <h3 className="text-center display-5 login-title mt-3">
              Welcome Back !!
            </h3>
            {apiError && <div className="alert alert-danger">{apiError}</div>}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            <div className="form-group">
              <label htmlFor="email" className="mb-2 mt-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="mb-2 mt-3">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <button type="submit" className="btn mt-4 w-100">
              Login
            </button>
          </form>
        </div>
        {/* Image column container */}
        <div className="col-md-6 col-12">
          <img src={loginImg} className="w-100" alt="Login Image" />
        </div>
      </div>
    </div>
  );
}
