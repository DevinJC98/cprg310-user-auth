"use client";
import Link from "next/link";
import "./login.css";
import { useState } from "react";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      setErrorMessage(data.error);
    } else {
      window.location.href = "/pages/dashboard";
    }
  }

  return (
    <section className="login-container">
      <div className="login-section">
        <h1 className="login-title">Log In</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              className="form-input"
              required
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-input"
              required
            ></input>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
      </div>

      <div className="register-section">
        <p className="register-text">Don't have an account?</p>
        <Link href="/pages/register" className="signup-btn">
          Register
        </Link>
      </div>
    </section>
  );
}
