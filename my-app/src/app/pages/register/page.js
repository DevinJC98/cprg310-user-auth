import Link from "next/link";
import "./register.css";

export default function RegistrationPage() {
  return (
    <div className="register-container">
      <div className="register-section">
        <h1 className="register-title">Create Account</h1>
        <form
          action="/api/auth/register"
          method="POST"
          className="register-form"
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fname" className="form-label">
                First Name
              </label>
              <input
                name="fname"
                type="string"
                className="form-input"
                required
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="lname" className="form-label">
                Last Name
              </label>
              <input name="lname" type="string" className="form-input"></input>
            </div>
          </div>

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
              minLength={8}
            ></input>
          </div>

          <button type="submit" className="signup-btn">
            Create Account
          </button>
        </form>
      </div>

      <div className="login-section">
        <p className="login-text">Already have an account?</p>
        <Link href="/pages/login" className="login-btn">
          Log In
        </Link>
      </div>
    </div>
  );
}
