import Link from "next/link";
import "./login.css";

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-section">
        <h1 className="login-title">Log In</h1>
        <form action="/api/auth/login" method="POST" className="login-form">
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

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
      </div>

      <div className="register-section">
        <p className="register-text">Don't have an account?</p>
        <Link href="/pages/register">
          <button className="signup-btn">Register</button>
        </Link>
      </div>
    </div>
  );
}
